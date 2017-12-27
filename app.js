var express = require('express');
var fs = require('fs');
var app = express();

const christmasBackgrounds = ['/assets/img/christmas/buddy.gif',
                              '/assets/img/christmas/makinItRain.gif',
                              '/assets/img/christmas/trippy_small.gif',
                              '/assets/img/christmas/badKitty.gif',
                              '/assets/img/christmas/goodKitty.gif'];

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// christmasBackgrounds.forEach((image) => {
//   fs.readFile('./dist' + image, function(error){
//     if(error) console.log("Error! " + error);

//     console.log("Done loading image!");
//   });
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
