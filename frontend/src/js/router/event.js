var Backbone      = require('backbone');
var ListEventView = require('view/listEvent');
var $             = require('jquery');
var DetailsView   = require('view/details');
var CreateView    = require('view/create');
var Model         = require('model/event');

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
        "view/:id":   'view',
        "add":        'add'
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
    },

    view: function(id){
        if(this.currentView){
            this.currentView.close();
        }

        var model = this.events.get(id);
        if(!model){
            toastr.error('El evento seleccionado no existe');
            window.location.hash= '/';
        }

        this.currentView = new DetailsView({
            model: model
        });
        $('#content').html(this.currentView.$el);
    },

    add: function(){
        if(this.currentView){
            this.currentView.close();
        }
        var model = new Model();
        this.events.add(model);
        this.currentView = new CreateView({
            model: model
        });
        $('#content').html(this.currentView.$el);
    }
});
