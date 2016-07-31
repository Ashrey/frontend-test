var Backbone = require('backbone');
var tpl      = require('tpl/events-list.hbs');
var shared   = require('tpl/shared.hbs');
var $        = require('jquery');

module.exports = Backbone.View.extend({
    className: 'list-event',

    events:{
        'click [data-shared]': 'shared'
    },

    initialize: function(options) {
        console.info(options);
        this.events_list = options.events_list;
        this.features    = options.features;
        this.listenTo(this.events_list, "change", this.render);
        this.listenTo(this.featured, "change", this.render);
        this.render();
    },

    render: function(){
        console.info('render');
        this.$el.html(
            tpl({
                events:   this.events_list.models,
                features: this.features.models
            })
        );
    },

    shared: function(e){
        var el =  $(e.currentTarget);
        var model = this.events_list.get(el.data('shared'));
        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(shared(model.attributes)));
    },

    close: function(){

    }
});
