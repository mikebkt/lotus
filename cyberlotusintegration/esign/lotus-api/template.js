var moment = require('moment');
var uuid = require('uuid');
var crypto = require("crypto");
var fs = require("fs");
// var verify = require('./10.verifyPdf_tool');
const http = require('http')
class SignPDF {

  method = "POST";
  scheme = "http";
  hostAddress = "demoapi.cyberhsm.vn:80"
  hostname = "demoapi.cyberhsm.vn";
  port = 80;
  resource = "/api/pdf/sign/originaldata";
  hashAlg = "SHA-1";
  secretKey = "MjhmYzdhZDkxZjI4ZWI2Y2FmNWIxYmEyMWRjNmMxMzM4NjI1Y2JmZDEzNjE2MWRhNWFkZmZkNjViNjAxYTk4Zg==";
  apiKey = "47dd2c92dfa246899d2c92dfa2868986";
  contentType = "application/json";

  constructor(fileToBas64, options = {}) {
    this.fileToBas64 = fileToBas64;

    console.log('fileToBas64.length', this.fileToBas64.length)

    const { hashalg , secretKey, apiKey, hostAddress, host, port } = options;

    if (hashalg) {
      this.hashAlg = hashalg;
    }

    if (secretKey) {
      this.secretKey = secretKey;
    }

    if (apiKey) {
      this.apiKey = apiKey;
    }

    if (host && port) {
      this.port = port;
      this.hostAddress = host + ":" + port;
    }

    if (hostAddress) {
      this.hostAddress = hostAddress;
      const hostAndPort = hostAddress.split(':')
      this.hostname = hostAndPort[0];
      this.port = hostAndPort[1]
    }

    console.log('constructed')
  }

  createBody() {
    const body = JSON.stringify({
      base64pdf: this.fileToBas64,
      hashalg: this.hashAlg,
    })
    return body;
  }

  createSignature(body) {
    const nonce =  uuid.v4()
    const currentMoment = moment()
    const timestamp = currentMoment.unix();
    this.timestampStr = currentMoment.format("ddd, DD MMM yyyy HH:mm:ss") + " GMT";
    this.hmacBuilder = crypto.createHmac("SHA256", Buffer.from(this.secretKey, "base64"));
    this.hmacBuilder.update(this.method, "utf8").update("\n")
    this.hmacBuilder.update(this.scheme, "utf8").update("\n")
    this.hmacBuilder.update(this.hostAddress, "utf8").update("\n")
    this.hmacBuilder.update(this.resource, "utf8").update("\n")
    this.hmacBuilder.update(this.contentType, "utf8").update("\n")
    this.hmacBuilder.update(this.apiKey, "utf8").update("\n")
    this.hmacBuilder.update(nonce, "utf8").update("\n")
    this.hmacBuilder.update(this.timestampStr, "utf8").update("\n")
    this.hmacBuilder.update(body, "utf8").update("\n")
    const signatureDigest = this.hmacBuilder.digest("base64");
    const signature = "HmacSHA256" + " " + this.apiKey + ":" + nonce + ":" + signatureDigest + ":" + timestamp;
    return signature;
  }

  async sendRequest(body, signature) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: this.resource,
      method: this.method,
      headers: {
        'Content-Type': this.contentType,
        Authorization: signature,
        Date: this.timestampStr,
      },
    }

    return await new Promise((resolve, reject) => {
      const chunk = [];

      const req = http.request(options, res => {
        // console.log(res)
        // console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
          // process.stdout.write(d)
          chunk.push(d)
        });

        res.on('end', () => {
          // console.log(chunk.toString());
          resolve(JSON.parse(chunk.toString()))
        })
      })

      req.write(body)

      req.on('error', error => {
        console.error(error)
      })

      req.end()
    })

  }

  async sign() {
    const body = this.createBody();
    const signature = this.createSignature(body);
    const result = await this.sendRequest(body, signature)
    console.log(result)
    return result;
  }

}

const SignPDFTest = async () => {
  const base64pdf =  fs.readFileSync('./testfile/CL_Integration_small_size.pdf', "base64");

  const pdfSigner = new SignPDF(base64pdf)
  const result = await pdfSigner.sign()

  console.log(result)
}


export default {SignPDF, SignPDFTest}



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




/**
 * Req
 */

