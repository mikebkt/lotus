const { exec } = require("child_process");


exec("openssl x509 -pubkey -noout -in cert.pem  > pubkey.pem", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});