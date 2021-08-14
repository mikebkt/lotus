var moment = require('moment');
var uuid = require('uuid');
var crypto = require('crypto');
const https = require('http');
const FormData = require('form-data');
const axios = require("axios");


// Create form data
const form = new FormData();
form.append('batdau', '1601609349');
form.append('ketthuc', '1601609349');

const timestampMs = moment();
const timestampStr = moment(timestampMs).format('ddd, DD MMM yyyy HH:mm:ss') + ' GMT';
const timestamp = Math.round(timestampMs.valueOf() / 1000);
const scheme = 'http';
const host = 'demoapi.cyberhsm.vn:80';
const contentType = 'application/json';
const apiKey = '47dd2c92dfa246899d2c92dfa2868986';
var nonce = uuid.v4();

const buidSignature = (
  method = 'GET',
  resource = '/api/account/service',
  payloadData = ''
) => {
  var hmacBuilder = crypto.createHmac(
    'sha256',
    new Buffer(
      'MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==',
      'base64'
    )
  );

  if (payloadData) {
    const payloadHash = crypto
      .createHash('sha1')
      .update(payloadData)
      .digest('base64');
    payloadData = JSON.stringify({
      base64digest: payloadHash,
      hashalg: 'sha1',
    });
  }

  console.log('payloadData :', payloadData);

  hmacBuilder
    .update(method)
    .update('\n')
    .update(scheme)
    .update('\n')
    .update(host)
    .update('\n')
    .update(resource)
    .update('\n')
    .update(contentType)
    .update('\n')
    .update(apiKey)
    .update('\n')
    .update(nonce)
    .update('\n')
    .update(timestampStr)
    .update('\n')
    .update(payloadData)
    .update('\n');

  const digest = hmacBuilder.digest('base64');

  const signature =
    'HmacSHA256' + ' ' + apiKey + ':' + nonce + ':' + digest + ':' + timestamp;
  return signature;
};

const method = 'GET';
const resource = '/api/account/service';
const payloadData = form.toString();
// const payloadData = "";


// console.log("buidSignature(method, resource, payloadData)", buidSignature(method, resource, payloadData));

console.log(timestampStr);

// const optionsHttp = {
//   hostname: 'demoapi.cyberhsm.vn',
//   port: 80,
//   path: '/api/account/info',
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: buidSignature(method, resource, ""),
//     Date: timestampStr,
//   },
// }

// const req = https.request(optionsHttp, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()


const config = {
  // hostname: 'demoapi.cyberhsm.vn',
  // port: 80,
  // path: '/api/account/info',
  baseURL: 'http://demoapi.cyberhsm.vn',
  url: "/api/account/info",
  method: method,
  // data: form,
  headers: {
    'Content-Type': 'application/json',
    Authorization: buidSignature(method, resource, payloadData),
    Date: timestampStr,
  },
};

const request = axios.request(config);
console.log(request);
request.then(function (response) {
  console.log(JSON.stringify(response.data));
}).catch(function (error) {
  // console.log(error);
});
