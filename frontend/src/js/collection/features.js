var Evento     = require('model/event');
var Backbone   = require('backbone');
module.exports = Backbone.Collection.extend({
    model: Evento,
    url: '/events/featured'
});
