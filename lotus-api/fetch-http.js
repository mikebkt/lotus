const fetch = require('node-fetch');


// fetch('http://demoapi.cyberhsm.vn/api/account/endcert', {
//         method: 'GET',
        // headers: { 
        //   'Content-Type': 'application/json',
        //   'Authorization': "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077",
        //   "Date": "Fri, 02 Oct 2020 09:51:17 GMT"
        // },
//     })
//     .then(res => res.json())
//     .then(json => console.log(json));


// //     xhr.setRequestHeader("Content-Type", "application/json");
// // xhr.setRequestHeader("Authorization", "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077");
// // xhr.setRequestHeader("Date", "Fri, 02 Oct 2020 09:51:17 GMT");


// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077");
// myHeaders.append("Date", "Fri, 02 Oct 2020 09:51:17 GMT");
// var FormData = require('form-data');

// var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077",
    "Date": "Fri, 02 Oct 2020 09:51:17 GMT"
  },
  // body: formdata,
  redirect: 'follow',
  mode: 'no-cors'
};

fetch("http://demoapi.cyberhsm.vn/api/account/endcert", requestOptions)
  .then((response, request) => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


// const body = JSON.stringify({
//   payload: "Ct4gtz91Hiwrog1h/VTc88bRf3E=",
//   alg: "SHA1withRSA",
// });


// var requestOptions = {
//   method: 'POST',
//   headers: { 
//     'Content-Type': 'application/json',
//     'Authorization': "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:7195f7be-a2b2-4ad7-aea6-d3a357094a7a:wFbIseO9Uta3GyboFH/jPJ+BkjFynb5eKy/e7Xje94E=:1602719641",
//     "Date": "Thu, 15 Oct 2020 06:54:01 GMT"
//   },
//   body: body,
//   redirect: 'follow'
// };

// fetch("http://demoapi.cyberhsm.vn/api/bin/sign/base64", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));