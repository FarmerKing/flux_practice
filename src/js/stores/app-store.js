var AppConstants = require("../constants/app-constants.js");
var AppDispatcher = require("../dispatchers/app-dispatcher.js");
var objectAssign = require('object-assign');
// var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _catalog = [];

for(var i=1; i<9; i++){
    _catalog.push({
        'id': 'Widget' + i, 
        'title': 'Widget # ' + i, 
        'summary': 'This is an awesome widget!',
        'description': 'Lorem ipsum dolor sit amet...', 
        'img': '/assets/product.png', 
        'cost': i
    });
}


// {inCart, qty}
var _cartItems = [];

function _removeItem(index){
    _cartItems[index].inCart = false;
    _cartItems.splice(index, 1);
}

function _increaseItem(index){
    _cartItems[index].qty++;
}

function _decreaseItem(index){
    if(_cartItems[index].qty>1){
        _cartItems[index].qty--;
    }
    else {
        _removeItem(index);
    }
}

function _cartTotals (){
    var total = _cartItems.reduce(function(preTotal, curItem){
        return curItem.cost * curItem.qty + preTotal;
    }, 0); 
    
    // _cartItems.forEach(function(item,i){
    //     var subTotal = item.cost * item.qty; 
    //     total += subTotal; 
    // });
    return { qty: _cartItems.length, 
             total: total};
}


function _addItem(item){
    if(!item.inCart){
        console.log("real add item");
        item.qty = 1;
        item.inCart = true;
        _cartItems.push(item);
    }
    else {
        _cartItems.forEach(function(cartItem, i){
            if(cartItem.id===item.id){
                _increaseItem(i);
            }
        });
    }
}

//var AppStore = merge(EventEmitter.prototype, {
var AppStore = objectAssign(EventEmitter.prototype, {
    emitChange: function(){
        console.log("emit change event");
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
        console.log("receive listener");
        this.on(CHANGE_EVENT,callback);
    }, 

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT,callback);
    }, 

    getCart: function(){
        return _cartItems;
    },

    getCatalog: function(){
        return _catalog;
    }, 

    getCartTotals: function(){
        return _cartTotals();
    },

    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
        case AppConstants.ADD_ITEM:
            console.log("store add itesm");
            _addItem(payload.action.item);
            break;

        case AppConstants.REMOVE_ITEM:
            _removeItem(payload.action.index);
            break;

        case AppConstants.INCREASE_ITEM:
            _increaseItem(payload.action.index);
            break;

        case AppConstants.DECREASE_ITEM:
            _decreaseItem(payload.action.index);
            break;
        }

        AppStore.emitChange();
        return true; 
    } )
});


module.exports = AppStore;
