var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var todos = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/prices', function(req, res) {
    res.send([
        {id: 1, name: 'Hyundai Elantra', price: Math.round(Math.random()*10000)},
        {id: 2, name: 'Hyundai Sonata', price: Math.round(Math.random()*10000)},
        {id: 3, name: 'Hyundai Accent', price: Math.round(Math.random()*10000)}
        ]);
});



app.listen(8888, function() {
    console.log('Example app listening on port 8888!')
});
