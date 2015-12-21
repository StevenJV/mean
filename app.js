var express = require('express');
var debug = require('debug')('app');
var _ = require('underscore-node');
var app = express();

var personData = [
    {
        "id":1,
        "firstName":"Anakin",
        "lastName":"Skywalker",
        "status":"redeemed Dark"
    },
    {
        "id":2,
        "firstName":"Luke",
        "lastName":"Skywalker",
        "status":"strong Light"
    },
    {
        "id":3,
        "firstName":"Han",
        "lastName":"Solo",
        "status":"non-Force Light"
        
    },
    {
        "id":4,
        "firstName":"Ben",
        "lastName":"Solo",
        "status":"Dark"        
    }
];

var port = process.env.PORT || 3000;
debug("We picked up port ", port, " for the port");


var getPerson = function(req,res) {
    if (req.person) {
        res.send(200, JSON.stringify(req.person));
    }
    else {
        res.send(400, { message: "Unrecognized identifier" + req});
    }
};

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/',function(req,res) {
	debug("/ requested");
	var response = personData;
    res.send(JSON.stringify(response));
});

app.get('/persons/:personId',getPerson);
app.param('personId', function(req, res, next, personId){
    debug("personId found:", personId);
    var person = _.find(personData, function(id){
        return personId == id.id;
    });
    debug("peson:", person);
    req.person = person;
    next();
});
