var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
const utf8 = require('utf8');

const hashalg = "SHA-1";

/* read actual file CL_Integration.pdf */
const exampleData = 'abc';

// kiem tra ho tro hash algorithm nao
const base64hash = crypto.createHash('sha1').update(exampleData).digest('base64');

console.log(base64hash);

const timestampMs = 1602719641000 // moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
const method = "POST";
const scheme = "https";
const hostname = "api.cyberhsm.vn";
const port = 443
const hostAndPort = hostname + ":" + port;
const resource = "/api/bin/sign/base64";
const contentType = "application/json";
const apiKey = "601d589a06b24cd79d589a06b23cd771";
var nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";

const body = JSON.stringify({
  payload: base64hash,
  alg: "SHA1withRSA",
});

console.log("body", body);
var hmacBuilder = crypto.createHmac("SHA256", new Buffer("MzMzZDY1ZDI4OGI0NWRlOGM4ZjI2NzRkYTlhYWJiOWE0NTEyYzYyYjMzMTk1MzBhOWI4MmQwMWY3MGJjZTNlNw==", "base64"));

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

const signature = "HmacSHA256" + " " + apiKey + ":" + nonce + ":" + signatureDigest + ":" + timestamp;
console.log("signature: ", signature);
console.log("Date: ", timestampStr);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

/**
 * Req
 */
const http = require('https')

const options = {
  hostname: hostname,
  port: 443,
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
  console.error(error)
})

req.end()

