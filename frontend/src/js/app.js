var Backbone   = require('backbone');
var Router     = require('router/event');
var Collection = require('collection/events');
var Features   = require('collection/features');
var App = new Router({
    collection: new Collection(),
    featured:   new Features()
});
