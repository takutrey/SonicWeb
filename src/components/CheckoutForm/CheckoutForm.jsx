import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import "./CheckoutForm.css";
// import EcocashModal from "../../modals/Ecocash/Ecocash";
// import MastercardModal from "../../modals/MasterCard/MasterCard";
import {
  setOrderType,
  setCustomerDetails,
  setItems,
  setPaymentMethod,
  setPaymentDetails,
  resetCheckout,
  placeOrder,
} from "../../lib/orderDetails";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";
import { toast } from "sonner";

const baseUrl = "https://sonicsignal-website.onrender.com/api";

const CheckoutForm = ({ onSubmit, items: initialItems }) => {
  const dispatch = useDispatch();
  const {
    orderType,
    customer,
    items,
    subtotal,
    paymentMethod,
    paymentDetails,
    orderPlaced,
    isLoading,
  } = useSelector((state) => state.checkout);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [activePaymentModal, setActivePaymentModal] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  // Initialize items in Redux
  useEffect(() => {
    // dispatch(setItems(initialItems));
  }, [initialItems]);

  // ----------------- Handlers -----------------

  const handleOrderTypeSelect = (type) => {
    // dispatch(setOrderType(type));
    setStep(2);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    // dispatch(setCustomerDetails({ [name]: value }));

    // Clear errors
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateStep2 = async () => {
    const newErrors = {};

    if (!customer.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
      newErrors.email = "Invalid email format";
    } else {
      try {
        setCheckingEmail(true);
        const response = await axios.get(`${baseUrl}/check-email/email-check`, {
          params: { email: customer.email },
        });

        if (!response.data.exists) {
          newErrors.email = "Email address does not exist";
        }
      } catch (error) {
        console.error("Error checking email:", error);
        newErrors.email = "Unable to verify email right now";
      } finally {
        setCheckingEmail(false);
      }
    }

    if (!customer.phone) newErrors.phone = "Phone number is required";

    if (orderType === "delivery") {
      if (!customer.phone) newErrors.phone = "Phone number is required";
      else if (!isValidPhoneNumber(customer.phone))
        newErrors.phone = "Invalid phone number";

      if (!customer.address?.trim()) newErrors.address = "Address is required";
      if (!customer.city?.trim()) newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep2Continue = async () => {
    const isValid = await validateStep2();

    if (isValid) {
      setStep(3);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    // dispatch(setPaymentMethod(method));
  };

  const handlePlaceOrder = () => {
    // if (!paymentMethod) {
    //   alert("Please select a payment method first");
    //   return;
    // }
    // setActivePaymentModal(paymentMethod);
  };

  const handlePaymentDetailsSubmit = async (details) => {
    // if (!paymentMethod) {
    //   console.error("Payment method not selected");
    //   return;
    // }
    // dispatch(setPaymentDetails({ method: paymentMethod, details }));
    // setActivePaymentModal(null);
    // try {
    //   const result = await dispatch(placeOrder()).unwrap();
    //   if (result.paymentSuccess) {
    //     toast.success("Order placed successfully");
    //   } else {
    //     toast.error("Payment failed. Please try again");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   const message =
    //     error.error || error.message || error || "Something went wrong";
    //   toast.error(message);
    // }
  };

  // ----------------- Calculations -----------------
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  // ----------------- Render -----------------
  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>
          Your order type: <strong>{orderType}</strong>
        </p>
        <p>
          We've sent a confirmation email to: <strong>{customer.email}</strong>
        </p>
        <button
          className="continue-shopping-button"
          onClick={() => {
            // dispatch(resetCheckout());
            onSubmit();
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ----------------- Step 1: Order Type -----------------
  if (step === 1) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">
          How would you like to receive your order?
        </h2>
        <div className="order-type-selection">
          <div
            className={`order-type-option ${
              orderType === "delivery" ? "selected" : ""
            }`}
            onClick={() => handleOrderTypeSelect("delivery")}
          >
            <div className="option-icon">🚚</div>
            <h3>Delivery</h3>
            <p>Get your order delivered to your doorstep</p>
          </div>
          <div
            className={`order-type-option ${
              orderType === "pickup" ? "selected" : ""
            }`}
            onClick={() => handleOrderTypeSelect("pickup")}
          >
            <div className="option-icon">🏪</div>
            <h3>Pickup</h3>
            <p>Pick up your order at our location</p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- Step 2: Customer Details -----------------
  if (step === 2) {
    return (
      <div className="checkout-container">
        <button className="back-button" onClick={() => setStep(1)}>
          ← Back
        </button>
        <h2 className="checkout-title">
          {orderType === "delivery" ? "Delivery Info" : "Pickup Info"}
        </h2>

        <form className="checkout-form">
          <div className="form-section">
            <label>Full Name *</label>
            <input
              name="fullName"
              value={customer.fullName}
              onChange={handleCustomerChange}
              className={errors.fullName ? "error" : ""}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}

            <label>Email *</label>
            <div className="input-with-spinner">
              <input
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                className={errors.email ? "error" : ""}
                placeholder="john@example.com"
              />
              {checkingEmail && <span className="spinner"></span>}
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}

            <label>Phone {orderType === "delivery" ? "*" : "*"}</label>
            <div
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                     focus-within:ring-2 focus-within:ring-ring 
                     focus-within:border-ring transition-colors mb-3"
            >
              <PhoneInput
                international
                defaultCountry="ZW"
                value={customer.phone}
                onChange={(value) =>
                  // dispatch(setCustomerDetails({ phone: value }))
                  console.log(value)
                }
                placeholder="Enter phone number"
                className="phone-input-inner w-full"
              />
            </div>
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}

            {orderType === "delivery" && (
              <>
                <label>Address *</label>
                <input
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  className={errors.address ? "error" : ""}
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}

                <label>City *</label>
                <input
                  name="city"
                  value={customer.city}
                  onChange={handleCustomerChange}
                  className={errors.city ? "error" : ""}
                  placeholder="Harare"
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            className="continue-button"
            onClick={handleStep2Continue}
            disabled={checkingEmail}
          >
            {checkingEmail ? "Checking email..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    );
  }

  // ----------------- Step 3: Payment -----------------
  return (
    <div className="checkout-container">
      <button className="back-button" onClick={() => setStep(2)}>
        ← Back
      </button>
      <h2 className="checkout-title">Payment Method</h2>

      <div className="payment-methods">
        <div className="payment-method">
          <input
            type="radio"
            id="mastercard"
            checked={paymentMethod === "mastercard"}
            onChange={() => handlePaymentMethodSelect("mastercard")}
          />
          <label htmlFor="mastercard">💳 MasterCard</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="ecocash"
            checked={paymentMethod === "ecocash"}
            onChange={() => handlePaymentMethodSelect("ecocash")}
          />
          <label htmlFor="ecocash">📱 EcoCash</label>
        </div>
      </div>

      {/* {activePaymentModal === "mastercard" && (
        <MastercardModal
          show
          onClose={() => setActivePaymentModal(null)}
          onSubmit={handlePaymentDetailsSubmit}
        />
      )}
      {activePaymentModal === "ecocash" && (
        <EcocashModal
          show
          onClose={() => setActivePaymentModal(null)}
          onSubmit={handlePaymentDetailsSubmit}
        />
      )} */}

      <button
        className="place-order-button"
        disabled={isLoading || !paymentMethod}
        onClick={handlePlaceOrder}
      >
        {isLoading
          ? "Processing..."
          : `Place Order - $${(orderType === "delivery"
              ? grandTotal + 2
              : grandTotal
            ).toFixed(2)}`}
      </button>
    </div>
  );
};

export default CheckoutForm;
