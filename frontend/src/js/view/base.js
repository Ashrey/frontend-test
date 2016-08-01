var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    close: function(){
        this.remove();
    }
});
