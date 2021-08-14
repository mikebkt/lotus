var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
const utf8 = require('utf8');

const hashalg = "SHA-1";

/* read actual file CL_Integration.pdf */
const base64pdf =  fs.readFileSync("CL_Integration.pdf");

const base64hash = crypto.createHash('sha1').update(base64pdf).digest('base64')

/* pre-computed hash of CL_Integration.pdf*/
// const base64hash = "fmxvlOQ34EOTQjDAsJnedUtsYOI=";

const timestampMs = 1602719641000 // moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
const method = "POST";
const scheme = "http";
const hostname = "demoapi.cyberhsm.vn";
const port = 80
const hostAndPort = hostname + ":" + port;
const resource = "/api/pdf/sign/hashdata";
const contentType = "application/json";
const apiKey = "47dd2c92dfa246899d2c92dfa2868986";
var nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";

const body = JSON.stringify({
  base64hash: base64hash,
  hashalg,
});

console.log(body);

var hmacBuilder = crypto.createHmac("SHA256", new Buffer("MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==", "base64"));

hmacBuilder
    .update(method).update("\n")
    .update(scheme).update("\n")
    .update(hostAndPort).update("\n")
    .update(resource).update("\n")
    .update(contentType).update("\n")
    .update(apiKey).update("\n")
    .update(nonce).update("\n")
    .update(timestampStr).update("\n")
    .update(body).update("\n")

const signatureDigest = hmacBuilder.digest("base64");

/**
 * Log
 */
// console.log("method: ", method);
// console.log("scheme: ", scheme);
// console.log("host: ", hostAndPort);
// console.log("resource: ", resource);
// console.log("content-type: ", contentType);
// console.log("apiKey: ", apiKey);
// console.log("nonce: ", nonce);
// console.log("timestampStr: ", timestampStr);
// console.log("body: ", body);
// console.log("bodyInfo: ", bodyInfo);
// console.log("signatureDigest: ", signatureDigest);

const signature = "HmacSHA256" + " " + apiKey + ":" + nonce + ":" + signatureDigest + ":" + timestamp;
console.log("signature: ", signature);
console.log("Date: ", timestampStr);


/**
 * Req
 */
const http = require('http')

const options = {
  hostname: hostname,
  port: 80,
  path: resource,
  method: 'POST',
  headers: {
    'Content-Type': contentType,
    Authorization: signature,
    Date: timestampStr,
  },
}


const req = http.request(options, res => {
  // console.log(res)
  // console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d)
  });
})

req.write(body)

req.on('error', error => {
  // console.error(error)
})

req.end()

