var Base     = require('view/base');
var tpl      = require('tpl/create.hbs');
var $        = require('jquery');

module.exports = Base.extend({
    className: 'add-event',

    events:{
        'change [name=eventImage]': 'preview',
        'submit form':   'save'
    },

    initialize: function(options) {
        this.render();
    },

    render: function(){
        this.$el.html(
            tpl()
        );
    },

    preview: function(){
        var url = $('[name=eventImage]').val();
        if(url){
            $('.preview img', this.$el).attr('src', url);
        }
    },

    save: function(e){
        console.info('Submit 1');
        e.preventDefault();
        var form = $('input, textarea', this.$el);
        var este = this; //copy
        form.each(function(index, elem){
            var $e = $(elem);
            este.model.set($e.attr('name'), $e.val());
        });
        //list of dates
        var dates = this.model.get('dates');
        this.model.set('dates', dates.split('\n'));
        var http = this.model.save();
        http.done(function(){
            window.location.hash = 'view/'+este.model.get('id');
        });
    }
});
