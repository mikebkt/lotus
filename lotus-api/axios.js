const axios = require('axios');


axios.get('http://demoapi.cyberhsm.vn/api/account/endcert', { headers: {
  'Content-Type': 'application/json',
  'Authorization': "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077",
  "Date": "Fri, 02 Oct 2020 09:51:17 GMT"
} })
 .then(response => {
     // If request is good...
     console.log(response.data);
  })
 .catch((error) => {
     console.log('error ' + error);
  });