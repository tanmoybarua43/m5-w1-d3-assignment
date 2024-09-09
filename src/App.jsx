import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    // Set initial state for products and cart quantity
    this.state = {
      products: [
        { id: 1, name: "Unisex Cologne", image: "/images/cologne.jpg", quantity: 0 },
        { id: 2, name: "Apple iWatch", image: "/images/iwatch.jpg", quantity: 0 },
        { id: 3, name: "Unique Mug", image: "/images/mug.jpg", quantity: 0 },
        { id: 4, name: "Mens Wallet", image: "/images/wallet.jpg", quantity: 0 }
      ],
      cartQuantity: 0
    };
  }

  // Function to handle changes in quantity
  handleQuantityChange = (id, delta) => {
    const updatedProducts = this.state.products.map(product => {
      if (product.id === id) {
        return { ...product, quantity: Math.max(product.quantity + delta, 0) };
      }
      return product;
    });

    const cartQuantity = updatedProducts.reduce((total, product) => total + product.quantity, 0);

    this.setState({ products: updatedProducts, cartQuantity });
  };

  render() {
    return (
      <div className="container">
        {/* Header */}
        <div className="row mt-4 cart-header">
          <div className="col">
            <h1>Shop to React</h1>
          </div>
          <div className="col text-right cart">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="ml-2">{this.state.cartQuantity}</span>
          </div>
        </div>

        {/* Product List */}
        {this.state.products.map((product) => (
          <div className="row mt-4" key={product.id}>
            <div className="col-md-3">
              <img src={product.image} alt={product.name} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h4>{product.name}</h4>
            </div>
            <div className="col-md-3 d-flex align-items-center">
              <button
                className="btn btn-outline-primary"
                onClick={() => this.handleQuantityChange(product.id, -1)}
              >
                -
              </button>
              <input
                type="text"
                value={product.quantity}
                className="form-control mx-2 text-center"
                style={{ width: "50px" }}
                readOnly
              />
              <button
                className="btn btn-outline-primary"
                onClick={() => this.handleQuantityChange(product.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
