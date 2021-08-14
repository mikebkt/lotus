var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");


/* read actual file CL_Integration.pdf */


// const base64hash = crypto.createHash('sha1').update(base64pdf).digest('base64')

/* pre-computed hash of CL_Integration.pdf*/
// const base64hash = "fmxvlOQ34EOTQjDAsJnedUtsYOI=";

const timestampMs = 1602719641000 // moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
const method = "POST";
const scheme = "http";
const hostname = "demoapi.cyberhsm.vn";
const port = 80
const hostAndPort = hostname + ":" + port;
const resource = '/api/pdf/verify';
const contentType = "application/json;charset=UTF-8";
const apiKey = "47dd2c92dfa246899d2c92dfa2868986";
const nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";


let body = "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";

// body = (new Buffer(body, 'base64'));

var hmacBuilder = crypto.createHmac("SHA256", new Buffer("MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==", "base64"));

hmacBuilder
    .update(method, "utf8").update("\n")
    .update(scheme, "utf8").update("\n")
    .update(hostAndPort, "utf8").update("\n")
    .update(resource, "utf8").update("\n")
    .update(contentType, "utf8").update("\n")
    .update(apiKey, "utf8").update("\n")
    .update(nonce, "utf8").update("\n")
    .update(timestampStr, "utf8").update("\n")
    .update(body).update("\n")

const signatureDigest = hmacBuilder.digest("base64");

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
  // res.setEncoding('utf8');
  res.on('data', d => {
    process.stdout.write(d)
  });
})

req.write(body)

req.on('error', error => {
  // console.error(error)
})

req.end()

