import $ from 'jquery';
import url from 'url';

const apiProtocol = "https";
const apiHost = "api.giphy.com";
const apiSearchPath = "/v1/gifs/search";
const apiTranslatePath = "/v1/gifs/translate";
const apiKey = "Wojl1VNfBn652GfHqzYOpQ8LBrWQQe5d";
const gifSizes= ["original", "downsized", "downsized_large", "downsized_medium", "downsized_small"];

var currentImageIndex = 0;

var apiTranslateParams = {
    api_key: apiKey,
    q: ""
}

var apiSearchParams = {
    api_key: apiKey,
    q: "",
    limit: 25, 
    offset: 0, 
    rating: "R",
    lang: "en"
}

function searchGiphy(searchTerm, canvas){
    return new Promise((resolve, reject) => {
        var urlObject = {
            protocol: apiProtocol,
            host: apiHost,
            pathname: apiSearchPath, 
            query: apiSearchParams
        }

        urlObject.query.q = searchTerm;
        $.getJSON(url.format(urlObject), function(respData){
            var gifUrl;

            if(respData.pagination.count === 0){
                //TODO get static not found gif
                gifUrl = "./assets/img/not_found.gif";
            }else{
                if(currentImageIndex >= respData.pagination.count) currentImageIndex = 0;

                var gifSizesIndex = 0;
                var gifData = respData.data[currentImageIndex++].images[gifSizes[gifSizesIndex]];
                while((gifData.height > canvas.height) || (gifData.width > canvas.width)){
                    gifData = respData.data[currentImageIndex].images[gifSizes[gifSizesIndex++]];
                    if(gifSizesIndex === gifSizes.length){
                        break;
                    }
                }
                gifUrl = gifData.url;
            }
            
            currentImageIndex = currentImageIndex%(respData.pagination.count);

            resolve(gifUrl);
        })
        .fail(function(){
            reject();
        });
    });
}

export {searchGiphy};