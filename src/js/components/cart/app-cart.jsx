/** @jsx React.DOM */
var React = require("react");
var Link = require("react-router-component").Link;

var AppStore = require("../../stores/app-store.js");
var RemoveFromCart = require("./app-removefromcart.jsx");
var Increase = require("./app-increase.jsx");
var Decrease = require("./app-decrease.jsx");
var StoreWatchMixins = require("../../mixins/StoreWatchMixins.jsx");

function cartItems(){
  var items = AppStore.getCart();
  console.log("cartItems", items);
  return {items:items };
}

var Cart = React.createClass({
  mixins: [StoreWatchMixins(cartItems)], 

  render: function(){
    var total = 0;
    var items = this.state.items.map(function(item,i){
      var subTotal = item.cost * item.qty; 
      total += subTotal; 
      return ( 
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>${subTotal}</td>
        </tr>
      );
    });
    return(
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th></th>
              <th>Subtotal</th>
            </tr>          
          </thead>
          <tbody>
            {items} 
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-right">Total</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
        <Link href='/'>Continue Shopping</Link>
      </div>
    );
  }
});


module.exports = Cart; 
