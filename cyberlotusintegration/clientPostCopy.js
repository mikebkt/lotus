var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
// const http = require('http');
var encoder = new TextEncoder("utf-8");
// form data input
const base64pdf =  fs.readFileSync("CL_Integration.pdf",  {encoding: 'base64'});

const base64hash = crypto.createHash('sha256').update(encoder.encode(base64pdf)).digest('base64')
const hashalg = "SHA256";
// const typesignature = 0;

const timestampMs = moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
// console.log("timestamp: ", timestamp);

const method = "POST";
const scheme = "http";
const host = "demoapi.cyberhsm.vn:80";
const resource = "/api/pdf/sign/hashdata";
const contentType = "application/json";
const apiKey = "47dd2c92dfa246899d2c92dfa2868986";
var nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";
let bodyDigest = '';

const body = JSON.stringify({
  base64hash,
  hashalg,
});
// const body = "";

console.log("pdfBase64Hash", base64hash);

console.log("requestBody", body);

if ( body ) {
    const hashOfBody = crypto.createHash('sha256').update(body).digest('base64')
    console.log("hashOfBody", hashOfBody)
    bodyDigest = JSON.stringify({
      base64digest: hashOfBody, 
      hashalg: 'SHA256'
    });
}

var hmacBuilder = crypto.createHmac("SHA256", new Buffer("MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==", "base64"));

hmacBuilder
    .update(method).update("\n")
    .update(scheme).update("\n")
    .update(host).update("\n")
    .update(resource).update("\n")
    .update(contentType).update("\n")
    .update(apiKey).update("\n")
    .update(uuid.parse(nonce)).update("\n")
    .update(timestampStr).update("\n")
    .update(bodyDigest).update("\n")

const signatureDigest = hmacBuilder.digest("base64");

// console.log("method: ", method);
// console.log("scheme: ", scheme);
// console.log("host: ", host);
// console.log("resource: ", resource);
// console.log("content-type: ", contentType);
// console.log("apiKey: ", apiKey);
// console.log("nonce: ", nonce);
// console.log("timestampStr: ", timestampStr);
// console.log("bodyDigest: ", bodyDigest);
// console.log("signatureDigest: ", signatureDigest);

const signature = "HmacSHA256" + " " + apiKey + ":" + nonce + ":" + signatureDigest + ":" + timestamp;


const http = require('http')
const options = {
  hostname: 'demoapi.cyberhsm.vn',
  port: 80,
  path: resource,
  method: 'POST',
  headers: {
    'Content-Type': contentType,
    // 'Content-Length': body.length,
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

