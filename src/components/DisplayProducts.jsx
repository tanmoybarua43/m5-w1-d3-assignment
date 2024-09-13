import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const DisplayProducts = ({ products, handleQuantityChange }) => {
  const [show, setShow] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleShow = (product) => {
    setActiveProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {products.map((product) => (
        <div className="row mt-4" key={product.id}>
          <div className="col-md-3">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              onClick={() => handleShow(product)}
            />
          </div>
          <div className="col-md-6">
            <h4>{product.name}</h4>
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

      {activeProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{activeProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={activeProduct.image} alt={activeProduct.name} className="img-fluid" />
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
