var Base     = require('view/base');
var tpl      = require('tpl/details.hbs');
var $        = require('jquery');

module.exports = Base.extend({
    className: 'view-event',

    events:{
        'click [data-shared]': 'shared'
    },

    initialize: function(options) {
        this.render();
    },

    render: function(){
        this.$el.html(
            tpl(this.model.attributes)
        );
    }
});
