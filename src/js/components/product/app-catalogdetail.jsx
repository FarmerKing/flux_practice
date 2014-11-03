/** @jsx React.DOM */
var React = require("react"); 
var Link = require("react-router-component").Link;

var AppStore = require("../../stores/app-store.js");
var StoreWatchMixins = require("../../mixins/StoreWatchMixins.jsx");
var AddToCart = require("../catalog/app-addtocart.jsx");

function getCatalogItem(component){
  var thisItem; 
  AppStore.getCatalog().forEach(function(item){
    if(item.id.toString() === component.props.item){
      thisItem = item;
    }
  });
  return {item:thisItem};
}

var CatalogDetail = React.createClass({
  mixins :[StoreWatchMixins(getCatalogItem)],
  render: function(){
    return (
      <div>
        <h2>{this.state.item.title}</h2>
        <img src={this.state.item.img} alt="" />
        <p>{this.state.item.description}</p>
        <p>${this.state.item.cost} <span className="text-success">{this.state.item.inCart && '(' + this.state.item.qty + ' in cart)'}</span></p>
        <div className="btn-group btn-group-sm">
          <AddToCart item={this.state.item} />
          <Link href='/' className="btn btn-default">Continue Shopping</Link>
        </div>
      </div>      
    );
  }
});

module.exports = CatalogDetail; 
