var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
const utf8 = require('utf8');


/* read actual file CL_Integration.pdf */
// const base64pdf =  fs.readFileSync("CL_Integration.pdf",  {encoding: 'base64'});

const hashalg = "SHA-1";
/* pre-computed hash of CL_Integration.pdf*/
const base64hash = "fmxvlOQ34EOTQjDAsJnedUtsYOI=";

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
  base64hash,
  hashalg,
});

const hashOfBody = crypto.createHash('sha1').update(body).digest('base64')

const bodyInfo =  JSON.stringify({
  base64digest: hashOfBody, 
  hashalg
});

var hmacBuilder = crypto.createHmac("SHA256", new Buffer("MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==", "base64"));

hmacBuilder
    .update(method, "utf8").update("\n", "utf8")
    .update(scheme, "utf8").update("\n", "utf8")
    .update(hostAndPort, "utf8").update("\n", "utf8")
    .update(resource, "utf8").update("\n", "utf8")
    .update(contentType, "utf8").update("\n", "utf8")
    .update(apiKey, "utf8").update("\n", "utf8")
    .update(nonce, "utf8").update("\n", "utf8")
    .update(timestampStr, "utf8").update("\n", "utf8")
    .update(utf8.encode(body), "utf8").update("\n", "utf8")

const signatureDigest = hmacBuilder.digest("base64");

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
  console.log();
  // console.log(res)
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d)
  });
})

req.write(body)

req.on('error', error => {
  console.error(error)
})

req.end()

