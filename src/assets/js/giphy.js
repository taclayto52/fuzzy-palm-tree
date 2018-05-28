import $ from 'jquery';
import url from 'url';

const apiProtocol = "https";
const apiHost = "api.giphy.com";
const apiSearchPath = "/v1/gifs/search";
const apiTranslatePath = "/v1/gifs/translate";
const apiKey = "Wojl1VNfBn652GfHqzYOpQ8LBrWQQe5d";
const gifSizes= ["original", "downsized", "downsized_large", "downsized_medium", "downsized_small"];

var currentImageIndex = 0;
let currentImageSearchResults;
let currentSearchQuery;

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

function _resolveGiphyResultsToUrlBasedOnCurrentIndex(){
    var gifUrl;
    
    if(!currentImageSearchResults || currentImageSearchResults.pagination.count === 0){
        //TODO get static not found gif
        gifUrl = "./assets/img/not_found.gif";
    }else{
        if(currentImageIndex >= currentImageSearchResults.pagination.count) currentImageIndex = 0;

        var gifSizesIndex = 0;
        var gifData = currentImageSearchResults.data[currentImageIndex++].images[gifSizes[gifSizesIndex]];
        while((gifData.height > canvas.height) || (gifData.width > canvas.width)){
            gifData = currentImageSearchResults.data[currentImageIndex].images[gifSizes[gifSizesIndex++]];
            if(gifSizesIndex === gifSizes.length){
                break;
            }
        }
        gifUrl = gifData.url;
    }
    
    currentImageIndex = currentImageIndex%(currentImageSearchResults.pagination.count);

    return(gifUrl);
}

// *** Exported functions ****
function searchGiphy(searchTerm, canvas){
    return new Promise((resolve, reject) => {
        var urlObject = {
            protocol: apiProtocol,
            host: apiHost,
            pathname: apiSearchPath, 
            query: apiSearchParams
        }

        urlObject.query.q = searchTerm;
        let searchQueryChanged = currentSearchQuery !== searchTerm;
        if(searchQueryChanged || !currentImageSearchResults){
            currentSearchQuery = searchTerm;

            $.getJSON(url.format(urlObject), function(respData){
                currentImageSearchResults = respData;
            })
            .fail(function(){
                reject();
            })
            .always(function(){
                resolve(_resolveGiphyResultsToUrlBasedOnCurrentIndex());
            });
        } else {
            resolve(_resolveGiphyResultsToUrlBasedOnCurrentIndex());
        }
    });
}

export {searchGiphy};