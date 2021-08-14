var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
const utf8 = require('utf8');

const hashalg = "SHA-1";

/* read actual file CL_Integration.pdf */
const base64xml =  fs.readFileSync("CL_Integration.xml", "base64");

const base64Cert = `MIIFwTCCA6mgAwIBAgIQVAEBCZjGniJmEoGPubEswjANBgkqhkiG9w0BAQsFADBqMTEwLwYDVQQDDChDeWJlckxvdHVzIERpZ2l0YWwgU2lnbmF0dXJlICBKU0MgUk9PVENBMSgwJgYDVQQKDB9Dw5RORyBUWSBD4buUIFBI4bqmTiBDWUJFUkxPVFVTMQswCQYDVQQGEwJWTjAeFw0xOTEwMTQxMjAwNTZaFw0zOTEwMTQxMjAwNTZaMGoxMTAvBgNVBAMMKEN5YmVyTG90dXMgRGlnaXRhbCBTaWduYXR1cmUgIEpTQyBST09UQ0ExKDAmBgNVBAoMH0PDlE5HIFRZIEPhu5QgUEjhuqZOIENZQkVSTE9UVVMxCzAJBgNVBAYTAlZOMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlrk+VW/WKDN6xxejULu4oB+ldo/7B/WSHwGaEOTPPx1vJLBMYlZdjW1Ewo/vzarMz3almmqjwsww7pd+Jx9uKs/0gFtY7A43wuzLzVqug+qFscfWjfVXrjAx8e37nexxz4CsgZImDFPX6SwGaTl2ryxECXVWcGhKVF0L11jyUptATP0XhknC4Vv+st/RIMDWOz4z+t9v4iUEQZoeGCLc+oGvYOkexkNuJnGJalkqHzgY+wW48bqa4rH+NM6G6vKfYtdmjTIL902E6jn6PmABacVPBfmWdp/geAq4wM6mGU+M2XsVD2c0FqAPW/W851GVZ6DvWj0Gg+J8QiCpy1HamFegN7DAGnIKv0cOOk7IwBHSjZQWQc9wu+kOUh+emi8S+hBOEeMjQ5yWq9urGs9Uqxbkk2kb03kPUSQjS6qovre7TAVZpYWIvwncFQYSdWkPxnXLMT12lRARuNGitlFx0s8J57gdA1a/b2GDQmpvpDxXFnOXEvdxryiNMfeYo2wTStCmg6pzLlxJ2KzrIdZgPEzS3CqTw8k9phr8wRqNLHOXNF4oEmIpWpplSunOwWHk0FVHU/aRj7ejOl4Op01d4kQHWetIK6/f0lHK99Vk2GGO6nw03FHDFWshjZtTv5U0DqptWNQIOO3QkEVtVPYR9J3tP991ic9ZSAt0BN+YfEUCAwEAAaNjMGEwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBQbdvMfqJgqfdysP1lRGGXd0xiGLTAdBgNVHQ4EFgQUG3bzH6iYKn3crD9ZURhl3dMYhi0wDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUAA4ICAQCBGMvIZqEVGIdQ3Y4fwpO105EmcDS0U3777hpjAtNxaKQA6nNIQOfseVYvW0yxIeqgOWkC9/3DRvWjmGXsKVnVXktO0NhQFjf55ErTIy1HG1JWOci4fxDCtmasBlva5ftzE3bjWheH6jFJUZaijb5GtQWlwSxFMbL+/qpC7G42X0Qzh7VJDusul7lXCjh7qWvCxHUnpj1/fGcry6Qzaan8LAvl2B6baa4Z5xSRj1HKaQpErhAgYXqx9TEvE/nszNcgXibMCZGzA1p0DLDiLAWLC/afh0Wzv0XFviiQCNLVIAkfwGrlfZYnKd0itHMa1/BwD2nx0RkJR/HWI+ewhU6a9FxKE/ByKSaQ0aGKMXD0g+sy/Ng4euw1QblHiVjax2sQ39taQo+hRKoufbFigWy+9RdWWNWtdA7VfzBxT5RU0XQG7PKQ1fmf7y3YnPZbD9JKmbNpWvts21hqsO5Ty2yrXyKA8h88RquatipIK0fRyXCXyLfx/uughRY91hFLyhq7GzhlkU4i3uFdsVBRFJPC34geKcZhekZQ0l/Smr9NzX8MtBIGRFf0E2IAmURckLJx+eVB4K8VBXPg/Wln/02ON+3QmSyDEjdmwj9WAun0y2Ei/BLitLTWCqKIzqtTNxb974L2N/aJqclzRZP0AV6PevSP8b2NgDdK2yEktiYrgA==`;

// const base64hash = crypto.createHash('sha1').update(base64pdf).digest('base64');

// console.log("base64hash :", base64hash);

/* pre-computed hash of CL_Integration.pdf*/
// const base64hash = "fmxvlOQ34EOTQjDAsJnedUtsYOI=";

const timestampMs = 1602719641000 // moment()
const timestamp = Math.round(timestampMs.valueOf()/1000);
const method = "GET";
const scheme = "http";
const hostname = "demoapi.cyberhsm.vn";
const port = 80
const hostAndPort = hostname + ":" + port;
const resource = "/api/certificate/verify";
const contentType = "application/json";
const apiKey = "47dd2c92dfa246899d2c92dfa2868986";
var nonce =  uuid.v4(); // "0f96edba-4b9a-4bf2-ad3f-da3d9783fbba" // 
const timestampStr = moment(timestampMs).format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";

const body = JSON.stringify({
  base64Cert,
});

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
    .update(body, "utf8").update("\n")

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

