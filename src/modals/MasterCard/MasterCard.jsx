import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const MastercardModal = ({ show, onClose, onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !cardDetails.cardholderName ||
      !cardDetails.email ||
      !cardDetails.cardNumber ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all MasterCard details.");
      return;
    }

    onSubmit?.({ paymentDetails: cardDetails });
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="checkout-modal"
    >
      <Modal.Header closeButton className="checkout-modal-header">
        <Modal.Title className="checkout-modal-title">
          Pay with MasterCard
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="checkout-modal-body">
        <Form onSubmit={handleSubmit}>
          {/* Cardholder Name + Email */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="checkout-form-label">
                  Cardholder Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={handleChange}
                  className="custom-form-control"
                  placeholder="John Doe"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="checkout-form-label">
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={cardDetails.email}
                  onChange={handleChange}
                  className="custom-form-control"
                  placeholder="john@example.com"
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Card Number / Expiry / CVV */}
          <Form.Group className="mb-3">
            <Form.Label className="checkout-form-label">
              Card Number *
            </Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              className="custom-form-control"
              placeholder="4111 1111 1111 1111"
              required
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="checkout-form-label">
                  Expiry Date *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleChange}
                  className="custom-form-control"
                  placeholder="MM/YY"
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="checkout-form-label">CVV *</Form.Label>
                <Form.Control
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  className="custom-form-control"
                  placeholder="123"
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="checkout-modal-footer">
            <Button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </Button>
            <Button type="submit" className="btn-confirm">
              Confirm Payment
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MastercardModal;
