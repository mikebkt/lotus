var moment = require('moment');
var uuid = require('uuid');
var crypto = require('crypto');
var fs = require('fs');

/* read actual file CL_Integration.pdf */

// const base64hash = crypto.createHash('sha1').update(base64pdf).digest('base64')

/* pre-computed hash of CL_Integration.pdf*/
// const base64hash = "fmxvlOQ34EOTQjDAsJnedUtsYOI=";

const timestampMs = 1602719641000; // moment()
const timestamp = Math.round(timestampMs.valueOf() / 1000);
const method = 'POST';
const scheme = 'http';
const hostname = 'demoapi.cyberhsm.vn';
const port = 80;
const hostAndPort = hostname + ':' + port;
const resource = '/api/office/verify';
const contentType = 'application/json;charset=UTF-8';
const apiKey = '47dd2c92dfa246899d2c92dfa2868986';
const nonce = uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" //
const timestampStr =
  moment(timestampMs).format('ddd, DD MMM yyyy HH:mm:ss') + ' GMT';

const verify = (fileSigned = "") => {
  const body = JSON.parse(fileSigned).base64officeSigned;
  console.log(body);

  var hmacBuilder = crypto.createHmac(
    'SHA256',
    new Buffer(
      'MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==',
      'base64'
    )
  );

  hmacBuilder
    .update(method, 'utf8')
    .update('\n')
    .update(scheme, 'utf8')
    .update('\n')
    .update(hostAndPort, 'utf8')
    .update('\n')
    .update(resource, 'utf8')
    .update('\n')
    .update(contentType, 'utf8')
    .update('\n')
    .update(apiKey, 'utf8')
    .update('\n')
    .update(nonce, 'utf8')
    .update('\n')
    .update(timestampStr, 'utf8')
    .update('\n')
    .update(body)
    .update('\n');

  const signatureDigest = hmacBuilder.digest('base64');

  const signature =
    'HmacSHA256' +
    ' ' +
    apiKey +
    ':' +
    nonce +
    ':' +
    signatureDigest +
    ':' +
    timestamp;
  console.log('signature: ', signature);
  console.log('Date: ', timestampStr);

  /**
   * Req
   */
  const http = require('http');

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
  };

  const req = http.request(options, (res) => {
    // console.log(res)
    // console.log(`statusCode: ${res.statusCode}`);
    // res.setEncoding('utf8');
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.write(body);

  req.on('error', (error) => {
    // console.error(error)
  });

  req.end();
};

module.exports = verify;
