import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ cartQuantity }) => (
  <div className="row mt-4 cart-header">
    <div className="col">
      <Link to="/"><h1>Shop2<span className="react-r">R</span>eact</h1></Link>
    </div>
    <div className="col text-right cart">
      <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        <span className="ml-2">{cartQuantity} Items</span>
      </Link>
    </div>
  </div>
);

export default Navbar;
