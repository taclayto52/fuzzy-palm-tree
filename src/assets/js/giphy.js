import $ from 'jquery';

const apiPrefix = "https://api.giphy.com/v1/gifs/translate"
const apiKey = "Wojl1VNfBn652GfHqzYOpQ8LBrWQQe5d";
const gifSize = "original";

function searchGiphy(searchTerm){
    return new Promise((resolve, reject) => {
        var getUri = apiPrefix + "?api_key=" + apiKey + "&s=" + searchTerm;

        $.getJSON(getUri, function(respData){
            var gifData = respData.data.images[gifSize];
            resolve(gifData.url);
        })
            .fail(function(){
                reject();
            });
    });
}

export {searchGiphy};