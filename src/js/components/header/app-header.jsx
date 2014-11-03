/** @jsx React.DOM */
var React = require("react");
var Link = require("react-router-component").Link;
var CartSummary =  require("./app-cartsummary.jsx");

var Header = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <Link href="/">
            <h1>Lets Shop</h1>
          </Link>
        </div>
        <div className="col-sm-2 col-sm-push3">
          <br />
          <CartSummary />
        </div>
      </div>
    );
  }
});

module.exports = Header; 
