var FormData = require('form-data');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://demoapi.cyberhsm.vn/api/account/endcert");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "HmacSHA256 47dd2c92dfa246899d2c92dfa2868986:057a81f4-64b0-4663-9dd2-518b3707c43c:P8k5mNGj66laXrJ8YDoFWVTqfBRvjWBhe4kBbY1Bges=:1601607077");
// xhr.setRequestHeader("Date", "Fri, 02 Oct 2020 09:51:17 GMT");

xhr.send(data);