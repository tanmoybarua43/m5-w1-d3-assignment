import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DisplayProducts from './components/DisplayProducts';
import { products } from './components/Products';
import Cart from './components/Cart';
import CheckOut from './components/Checkout';
import SignIn from './components/SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
      cartQuantity: 0,
      isAuthenticated: false // State to track user authentication
    };
  }

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

  // Function to handle login (called from SignIn component)
  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar cartQuantity={this.state.cartQuantity} />
          <Routes>
            <Route path="/" element={<DisplayProducts products={this.state.products} handleQuantityChange={this.handleQuantityChange} />} />
            <Route path="/cart" element={<Cart products={this.state.products.filter(product => product.quantity > 0)} />} />
            
            {/* Protected route for checkout */}
            <Route
              path="/checkout"
              element={
                this.state.isAuthenticated ? <CheckOut /> : <Navigate to="/signin" />
              }
            />
            
            {/* SignIn route */}
            <Route path="/signin" element={<SignIn onLogin={this.handleLogin} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
