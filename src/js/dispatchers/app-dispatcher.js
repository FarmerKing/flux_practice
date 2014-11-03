var Dispatcher = require("./dispatcher.js"); 
var objectAssign = require('object-assign');
//var merge = require("react/lib/merge");

// var AppDispatcher = merge(Dispatcher.prototype, {
var AppDispatcher = objectAssign(Dispatcher.prototype, {

    handleViewAction: function(action){
        console.log('action', action);
        this.dispatch({
            source: "VIEW_ACTION",
            action: action
        });
    }
});


module.exports = AppDispatcher;
