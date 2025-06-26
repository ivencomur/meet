const getAuthUrlButton = document.getElementById("getAuthUrlButton");
const resultElement = document.getElementById("result");
const resultLink = document.getElementById("authURL");
//can i get the elements correctly
console.log(getAuthUrlButton, resultElement,resultLink)
const getAuthURL =
  "https://hfdv4xdshp3lvsxv6ktelz2buy0slssn.lambda-url.us-east-1.on.aws/";

  //definte click listern for getauthurlbutton
getAuthUrlButton.onclick = function () {
  fetch(getAuthURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const result = JSON.stringify(json);

      const { authUrl } = JSON.parse(result);

      resultElement.innerText = result;
      resultLink.href = authUrl;
    });
};
//4/0AVMBsJhHxByQODRUSLBnHAQHPEU_FNkDNZrtyuVaVjFrt86EuDdbxM5rCCOIIBglb9qxuA
// //&scope=https://www.googleapis.com/auth/calendar.events.public.readonly

const codeValue = document.getElementById("code");
const getAccessToken = document.getElementById("getToken");
const accessTokenElement = document.getElementById("accessToken");

getAccessToken.onclick = function () {
    const getTokenUrl ="https://gppssjeu5d5rud3pa4flehawri0cenhf.lambda-url.us-east-1.on.aws";
  let code = "4/0AVMBsJhHxByQODRUSLBnHAQHPEU_FNkDNZrtyuVaVjFrt86EuDdbxM5rCCOIIBglb9qxuA"
  if (decodeURIComponent(code) === code) {
    code = encodeURIComponent(code);
  }
  const getTokenRequest = getTokenUrl + "/" + code;
  fetch(getTokenRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
        console.log(json)
      //accessTokenElement.innerText = JSON.stringify(json);
    });
};
