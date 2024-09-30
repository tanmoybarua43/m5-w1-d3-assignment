import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const DisplayProducts = ({ products, handleQuantityChange, sortOption, handleSortChange }) => {
  const [show, setShow] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleShow = (product) => {
    setActiveProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {/* Dropdown for sorting options */}
      <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-end">
          <label className="mr-2">Sort by:</label>
          <select
            className="form-control"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="normal">Default</option>
            <option value="lowest">Price: Lowest to Highest</option>
            <option value="highest">Price: Highest to Lowest</option>
          </select>
        </div>
      </div>

      {/* Display Products */}
      {products.map((product) => (
        <div className="row mt-4" key={product.id}>
          <div className="col-md-3">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              onClick={() => handleShow(product)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="col-md-6">
            <h4 onClick={() => handleShow(product)} style={{ cursor: "pointer" }}>{product.name}</h4>
            <p>Price: <span className='PriceTag'>${product.price.toFixed(2)}</span></p> {/* Displaying product price */}
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleQuantityChange(product.id, -1)}
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
              onClick={() => handleQuantityChange(product.id, 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Modal for product details */}
      {activeProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{activeProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={activeProduct.image} alt={activeProduct.name} className="img-fluid" />
            <p>Price: ${activeProduct.price.toFixed(2)}</p> {/* Displaying price in modal */}
            <p>Ratings: {activeProduct.ratings}</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DisplayProducts;
