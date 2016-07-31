var Backbone      = require('backbone');
var ListEventView = require('view/listEvent');
var $             = require('jquery');

module.exports = Backbone.Router.extend({

    initialize: function(options) {
        //alias for this
        var este = this;
        this.events   = options.collection;
        this.featured = options.featured;
        //WHEN  both load 
        $.when(this.events.fetch(), this.featured.fetch()).then(function(){
            Backbone.history.start();
        });
    },

    routes: {
        "":           "home",
        "view/:id":   'view'
    },

    home: function() {
        //no zombie view
        if(this.currentView){
            this.currentView.close();
        }

        this.currentView = new ListEventView({
            events_list:   this.events,
            features: this.featured
        });
        $('#content').html(this.currentView.$el);
    }
});
