/** @jsx React.DOM */
var React = require("react");
var Link = require("react-router-component").Link;
var AppStore = require("../../stores/app-store.js");
var StoreWatchMixins = require("../../mixins/StoreWatchMixins.jsx");

function CartTotals(){
  return AppStore.getCartTotals(); 
}

var CartSummary = React.createClass({
  mixins: [StoreWatchMixins(CartTotals)], 

  render: function(){
    return (
      <div>
        <Link href="/cart" className="btn btn-success">
        Cart Items: {this.state.qty} / ${this.state.total}
        </Link>
      </div>
    );
  }
});

module.exports = CartSummary;