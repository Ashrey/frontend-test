var db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/events', function (req, res) {
    res.json(db.findAll());
});

app.get('/events/featured', function (req, res) {
    res.json(db.featured());
});

app.get('/events/:id', function (req, res) {
    var event = db.finById(req.params.id);
    if(event) {
        res.json(event);
    } else {
        res.sendStatus(404);
    }
});

app.post('/events', function (req, res) {
    res.json(db.create(req.body.event));
});

module.exports = app;
