#!/usr/bin/env node

var express = require('express');
var http = require('http')
var path = require('path');
var httpreq = require('httpreq');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3003);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('imp546s4f6sd4f6s4f'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function (req, res){
	res.render('index', { title: 'Electric Imp: Turn on the light!' });
});

app.post('/rest/light/changestate', function (req, res){
	if(!req.body.state) return res.json({err: "No state given"});

	var state = req.body.state;

	if(state != "on" && state!= "off") return res.json({err: "State should be 'on' or 'off'"});

	var value = 0;
	if(state == "on")
		value = 1;

	httpreq.post('https://api.electricimp.com/v1/3f4da4ff92af3e24/30674a9b99a1646f', {parameters:{value:value}}, function (err, impres){
		if(err) return res.json({err: err});

		console.log(impres.body);

		res.json({err:0, state: state});
	});


});
