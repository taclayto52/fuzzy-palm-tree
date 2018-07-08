const gipyOauthToken = '8d8e26f1492b7ddd50cd097ae78617de91990b5c';
const clientId = '4bdd58ba264d2604628750282115514141a2262e';
const clientSecret = 'e9a602dd6fa3b774225e2da284fcc974b6d9ee6d';
// const accessToken = '53e4b4e2af87e86daba4cf37ff3eb4adba940980';

var rp = require('request-promise');
var userCreds = require('./userCreds.js');

var accessToken;

function authenticateWithBitly(){
    var requestOptions = {
        'url': 'https://api-ssl.bitly.com/oauth/access_token',
        'method': 'POST',
        'auth': {
            'user': userCreds.bitlyUser,
            'pass': userCreds.bitlyPass,
            'sendImmediately': true
        },
        'form': {
            'client_id': userCreds.bitlyClientId,
            'client_secret': userCreds.bitlyClientSecret
        }
    };

    rp(requestOptions)
        .then(function(resp){
            if(resp.startsWith('{')){
                respJson = JSON.parse(resp);
                if(respJson.status_code && respJson.status_code > 201){
                    console.log('error!');
                }
            }
            else{
                accessToken = resp;
            }
        })
        .catch(function(err){
            console.log('err from bitly auth:', err);
        });
}

function createBitLink(url){
    var requestOptions = {
        'url': 'https://api-ssl.bitly.com/v3/shorten',
        'method': 'GET',
        'qs': {
            'longUrl': url,
            'access_token': accessToken
        }
    };

    rp(requestOptions)
        .then(function(resp){

        })
        .catch(function(err){

        });
}

module.exports = {authenticateWithBitly, createBitLink};