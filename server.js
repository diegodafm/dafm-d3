/**
 * Created by Diego Alisson on 12/14/14.
 */
var express  = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 5000, function(){
    console.log('Express server listening on port ' + port );
});

