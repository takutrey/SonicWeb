import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { addCustomerData } from "../../lib/checkout";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails } from "../../lib/orderDetails";

const EcocashModal = ({ show, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((state) => state.checkout);

  const [phone, setPhone] = useState(paymentDetails.ecocash.phone || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPaymentDetails(value));
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone || "")) {
      alert("Invalid phone number");
      return;
    }

    try {
      dispatch(
        setPaymentDetails({
          method: "ecocash",
          details: { phone },
        })
      );

      onSubmit?.({ phone });

      onClose();
    } catch (error) {
      console.error("Error saving Ecocash data:", error);
      alert("Failed to save Ecocash details. Try again.");
    }
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
          Pay with EcoCash
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="checkout-modal-body">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <Form.Group className="mb-6">
                <Form.Label className="checkout-form-label">
                  Phone Number *
                </Form.Label>
                <PhoneInput
                  international
                  defaultCountry="ZW"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter phone number"
                  className="phone-input"
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

export default EcocashModal;
