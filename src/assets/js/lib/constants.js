const constants = {
    "waitMessages" : ["WAIT WAIT",
                    "HOLD ON",
                    "ONE MOMENT PLEASE",
                    "JUST A MINUTE",
                    "BE WITH YOU IN A MOMENT", 
                    "ONE SEC",
                    "RETICULATING SPLINES",
                    "BEATING PEONS", 
                    "WOLOLOLOLO"],
    "christmasGifs" : ['./assets/img/christmas/buddy.gif',
                        './assets/img/christmas/makinItRain.gif',
                        './assets/img/christmas/trippy_small.gif',
                        './assets/img/christmas/badKitty.gif',
                        './assets/img/christmas/goodKitty.gif']
} 

var currentLoadingMessageIndex = 0;
function getNextLoadingMessage(){
    const returnLoadingMessageIndex = currentLoadingMessageIndex;
    currentLoadingMessageIndex = (currentLoadingMessageIndex+1)%(constants.waitMessages.length);
    return constants.waitMessages[returnLoadingMessageIndex];
}

function addQueryToUrlObject(currentUrlObject, queryKeyToAdd, queryValueToAdd){
    let returnedUrlObject = Object.assign({}, currentUrlObject);

    delete returnedUrlObject.search;
    returnedUrlObject.query[queryKeyToAdd] = queryValueToAdd;

    return returnedUrlObject;
}

const exports = {
    constants: constants,
    getNextLoadingMessage: getNextLoadingMessage,
    addQueryToUrlObject: addQueryToUrlObject
}


export {exports};