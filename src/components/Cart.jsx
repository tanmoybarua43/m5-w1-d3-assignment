import React from 'react';

const Cart = ({ products }) => (
  <div className="cart">
    <h2>Your Cart</h2>
    {products.length > 0 ? (
      products.map((product) => (
        <div key={product.id} className="row mt-4">
          <div className="col-md-3">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h4>{product.name}</h4>
            <p className="quantity">Quantity: {product.quantity}</p>
          </div>
        </div>
      ))
    ) : (
      <p>Your cart is empty</p>
    )}
  </div>
);

export default Cart;
