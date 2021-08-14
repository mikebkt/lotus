const endCert = `MIIEnDCCA4SgAwIBAgIQVAEBCR8Rug4iBWInHTwAAjANBgkqhkiG9w0BAQUFADBfMSYwJAYDVQQDDB1Mb3R1c0NBIERpZ2l0YWwgU2lnbmF0dXJlIFNKQzEoMCYGA1UECgwfQ8OUTkcgVFkgQ+G7lCBQSOG6pk4gQ1lCRVJMT1RVUzELMAkGA1UEBhMCVk4wHhcNMjAwNTEyMDkwMjQ3WhcNMjEwNTEzMDkwMjQ3WjA/MR4wHAYKCZImiZPyLGQBARMOTVNUOjAxMjM0NTY3ODkxEDAOBgNVBAMTB0JGREZHREcxCzAJBgNVBAYTAlZOMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq/bIm239/CtcrRSIivyTGaA0/BG7uCPp+YfdyO9U/dNbHhfttgPksuzqyWUv+eaWeVddpiqyMhcT/WUvGfJbQ77qMZLI/VCFoJjRbq9ziDax7hDlaWwXGCVhL5jOyyncvDZhVickLW6ihkuaLMrBId/TpE5sXV/LbQdbrzTbBwuUXEsr1V3eHh9CxHsmyiCgZ/AKJiy4AKH4ZTgUPTuQ9dnv+AqdSHovAHNUsTLM8E+YHkHaIG8+rwo3T7+2ikiCw8/APj6YPQWzwQhKkoDQbL1lt+sgpTjIk4QSo7RqgtiRm+h6sJKePfbZn/5rsxlASRd0pnKUYwSG1ltuByfzkQIDAQABo4IBcjCCAW4wDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBShLzDDL1rfUtaWcnvIZyXiD1bFJDA3BggrBgEFBQcBAQQrMCkwJwYIKwYBBQUHMAGGG2h0dHA6Ly9kZW1vb2NzcC5sb3R1c2NhLmNvbTASBgNVHREECzAJgQdzdmRAZmhqMDoGA1UdIAQzMDEwLwYMKwYBBAGB7QMBCQMBMB8wHQYIKwYBBQUHAgIwEQwPT1NfSFNNX0N5YmVyXzFZMDQGA1UdJQQtMCsGCCsGAQUFBwMCBggrBgEFBQcDBAYKKwYBBAGCNwoDDAYJKoZIhvcvAQEFME8GA1UdHwRIMEYwRKAqoCiGJmh0dHA6Ly9kZW1vY3JsLmxvdHVzY2EuY29tL2xvdHVzY2EuY3JsohakFDASMRAwDgYDVQQDDAdMT1RVU0NBMB0GA1UdDgQWBBQVt+z+9kbnVD2xKfhgaRnIalk+iDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADggEBAADUhjWxFeBSPpsyvP/AZgtNcHfmjBiHZhKbgzGkTwRMy5bOtfdP17Zj2s5pVshlUtkKKgXArf5PSbPFNhjuf9nMT95q5ZirE40ljfKXRg9xJswcshV+gVeEEqA+2a9RLrusy0YkzERQXFT0wPr5F3y+FGMKSVUO9vZHu0ZATdwlV/VOQmlnivuOR/crmjzBKu50xeK2ZglpYOYzSqqdm5y/ekQTN2S6oLG4Br3JU3bnoaGSg+mJUVkQ0SRY5CR9JnqZt5V4J1w3iUMGVTLIM+kl8J4QqrhvUXcEXMkP9OpTar17ti5pLvSKGtO3N3prAO0PA0jt9/PBGvktFKVjyFo=`


// for(let char)

const index = 0;
const newStr = ''

const arr = [];

// console.log(endCert.match(/.{1,64}/g).join("\n"))

const cert = '-----BEGIN CERTIFICATE-----' + '\n' + endCert.match(/.{1,64}/g).join("\n") + '\n' + '-----END CERTIFICATE-----';
console.log('cert\n', cert)
// function truncate(str, n){
//   return (str.length > n) ? str.substr(0, n-1) + '\n' : str;
// };



// function truncate2( str, n, useWordBoundary ){
//   if (str.length <= n) { return str; }
//   const subString = str.substr(0, n-1); // the original check
//   return (useWordBoundary 
//     ? subString.substr(0, subString.lastIndexOf(" ")) 
//     : subString) + "&hellip;";
// };



// // console.log(cert);

// // -----BEGIN CERTIFICATE-----


// // -----END CERTIFICATE-----