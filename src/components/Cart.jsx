import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ products }) => {
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {totalItems > 0 ? (
        <>
          {products.map((product) => (
            <div key={product.id} className="row mt-4">
              <div className="col-md-3">
                <img src={product.image} alt={product.name} className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h4>{product.name}</h4>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Link to="/checkout" className="btn btn-success">
              Check Out
            </Link>
          </div>
        </>
      ) : (
        <>
          <p>There are {totalItems} item in your cart.</p>
          <Link to="/" className="btn btn-primary text-white">
            Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
