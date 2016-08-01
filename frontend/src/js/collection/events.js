var Evento     = require('model/event');
var Backbone   = require('backbone');
var _          = require('underscore');
module.exports = Backbone.Collection.extend({
    model: Evento,
    url: '/events',
    comparator: function(model) {
        return model.get('title');
    }
});
