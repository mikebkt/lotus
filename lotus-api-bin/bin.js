var fs = require('fs');
var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
var crypto = require('crypto');
var forge = require('node-forge');

const hashalg = "SHA1withRSA";
const hashalgVerify = 'RSA-SHA1'

/* read actual file CL_Integration.pdf */
const dataToSign = {
  doctor: "Hyun Bin",
  patient: "Son Ye Jin",
  disease: [
    {name: "too rich", level: 9999},
    {name: "too handsome", level: 10000},
  ]
}
const fileRaw =  Buffer(JSON.stringify(dataToSign)).toString('base64');
console.log('fileRaw', fileRaw)


const timestampMs = 1602719641000 // moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
const method = "POST";
const scheme = "http";
const hostname = "demoapi.cyberhsm.vn";
const port = 80
const hostAndPort = hostname + ":" + port;
const resource = "/api/bin/sign/base64";
const contentType = "application/json";
const apiKey = "6cbd4d53cb4e419cbd4d53cb4e819c3a";
var nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";

const body = JSON.stringify({
  payload: fileRaw,
  alg: hashalg,
});

console.log(body);

var hmacBuilder = crypto.createHmac("SHA256", new Buffer("OTFlMjBiOWE3YmE3YmQ5NjlhMzJkOTFhODE4OWJkMWZjOWQwMGVmYzFmYjAwZGZlMTc0ZTcyZDJkOTA2NzliOA==", "base64"));

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
  let buff = []
  res.on('data', d => {
    // process.stdout.write(d)
    buff.push(d)
  });
  
  res.on('end', (x, y) => {
    const data = Buffer.concat(buff).toString();
    console.log("xxxxxxxxxxxxxxxxxxxxx", data);
    // const signature = Buffer.from(JSON.parse(data).obj, 'base64')
    // var cert = fs.readFileSync('./cert.pem').toString();
    // var v = crypto.createVerify(hashalgVerify);
    // v.update(fileRaw, 'base64');
    // const verified = v.verify(cert, signature)
    // console.log('verified', verified)
  })
})

req.write(body)

req.on('error', error => {
  console.error("errrrrrrrrrrrrrrr", error)
})

req.end()

