var axios = require('axios');
var FormData = require('form-data');
var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var nonce = uuid.v4();
const http = require('http');

var hmacBuilder = crypto.createHmac("sha256", new Buffer("MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==", "base64"));

const timestampMs = moment();
const timestamp = Math.round(timestampMs.valueOf()/1000);
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";
const method = "GET";
const scheme = "http";
const host = "demoapi.cyberhsm.vn:80";
const resource = "/api/account/info";
const contentType = "application/json";
const apiKey = "47dd2c92dfa246899d2c92dfa2868986";
let payloadDigest = '';
const beginTime = moment.unix(1601609349).format('DD-MM-YYYY HH:mm:ss');
const endTime =  moment.unix(1601865594).format('DD-MM-YYYY HH:mm:ss');
// const body = `{“batdau”: “1601609349”, “ketthuc”: “1601865594”}`;
const body = '';

if ( body ) {
    const payloadHash = crypto.createHash('sha1').update(body).digest('base64')
    payloadDigest = JSON.stringify({base64digest: payloadHash, hashalg: 'sha1'});
}

hmacBuilder
  .update(method).update("\n")
  .update(scheme).update("\n")
  .update(host).update("\n")
  .update(resource).update("\n")
  .update(contentType).update("\n")
  .update(apiKey).update("\n")
  .update(nonce).update("\n")
  .update(timestampStr).update("\n")
  .update(payloadDigest).update("\n");

const digest = hmacBuilder.digest("base64");

const signature = "HmacSHA256" + " " + apiKey + ":" + nonce + ":" + digest + ":" + timestamp;

let data = new FormData();
data.append('batdau', beginTime);
data.append('ketthuc', endTime);

const config = {
  method: 'get',
  url: `http://demoapi.cyberhsm.vn${resource}`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': signature, 
    'Date': timestampStr, 
    // ...data.getHeaders()
  },
  // data: {
  //   batdau: beginTime,
  //   ketthuc: endTime
  // }
  // data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
