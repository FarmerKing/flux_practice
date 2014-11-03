var React = require("react");
var AppStore = require("../../stores/app-store.js");
var StoreWatchMixins = require("../../mixins/StoreWatchMixins.jsx");

var AddToCart = require("./app-addtocart.jsx");
var CatalogItem = require("./app-catalogitem.jsx");

function getCatalog(){
  return {items:AppStore.getCatalog() };
}

var Catalog = React.createClass({
  mixins: [StoreWatchMixins(getCatalog)],
  render: function(){
    var items = this.state.items.map(function(item){
      return ( 
        <CatalogItem item={item}/>
      );
    });
    return(
      <div className="row">
        {items}
      </div>
    );
  }
});

module.exports = Catalog; 

