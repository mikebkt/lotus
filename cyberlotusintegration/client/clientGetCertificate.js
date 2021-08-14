var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");


var hmacBuilder = crypto.createHmac("sha256", new Buffer("NThlMGQ2YWE4MDY4NDgxYzUxNzM5Y2U0Y2YyNjgyYzJiZWY1YjIxOWVmMDExZDc1MzE2MDBhN2RhYWQ3ZDdkNw==", "base64"));

// var hmacBuilder = crypto.createHmac("sha256", "MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==");
var nonce = uuid.v4();
// var nonce = "";

// const body = `{“batdau”: “1601609349”, “ketthuc”: “1601609349”}`

const timestampMs = moment();
const timestamp = Math.round(timestampMs.valueOf()/1000);
console.log("timestamp: ", timestamp);

const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";
const method = "GET";
const scheme = "https";
const host = "api.cyberhsm.vn:443";
const resource = "/api/account/info";
const contentType = "application/json";
const apiKey = "6ea6df8de1824b89a6df8de1821b89c2";
let payloadDigest = '';
// if ( body ) {
//     const payloadHash = crypto.createHash('sha1').update(body).digest('base64')
//     payloadDigest = JSON.stringify({base64digest: payloadHash, hashalg: 'sha1'});
// }

// const payload = "";
// const payload = "{“batdau”: “1601609349”, “ketthuc”: “1601609349”}";

hmacBuilder
    .update(method).update("\n")
    .update(scheme).update("\n")
    .update(host).update("\n")
    .update(resource).update("\n")
    .update(contentType).update("\n")
    .update(apiKey).update("\n")
    .update(nonce).update("\n")
    .update(timestampStr).update("\n")
    .update("").update("\n");

// if (payloadDigest) hmacBuilder.update(payloadDigest).update("\n")

const digest = hmacBuilder.digest("base64");

// console.log("method: ", method);
// console.log("scheme: ", "http");
// console.log("host: ", host);
// console.log("resource: ", resource);
// console.log("content-type: ", "application/json");
// console.log("apiKey: ", "47dd2c92dfa246899d2c92dfa2868986");
// console.log("nonce: ", nonce);
// console.log("timestampStr: ", timestampStr);
// console.log("body: ", payloadDigest);
// console.log("payloadDigest: ", payloadDigest);
// console.log("digest: ", digest);


const signature = "HmacSHA256" + " " + apiKey + ":" + nonce + ":" + digest + ":" + timestamp;
console.log("signature: ", signature);
console.log("timestampStr: ", timestampStr);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'


const https = require('https')
const options = {
  hostname: 'api.cyberhsm.vn',
  port: 443,
  path: '/api/account/info',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: signature,
    Date: timestampStr,
  },
  // body: body
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()

