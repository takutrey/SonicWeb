import React, { useState } from "react";
import { X } from "lucide-react";
import "./CheckoutForm.css";

const CheckoutForm = ({ onSubmit, total, items }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "credit",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    // Payment method validation
    if (formData.paymentMethod === "credit") {
      if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Invalid card number";
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = "Invalid format (MM/YY)";
      if (!formData.cardCVC.trim()) newErrors.cardCVC = "CVC is required";
      if (!/^\d{3,4}$/.test(formData.cardCVC)) newErrors.cardCVC = "Invalid CVC";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total
      });
      // Form submission successful
    } catch (error) {
      console.error("Checkout submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate tax (assuming 8% tax rate)
  const taxRate = 0.08;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount;

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="order-items">
          {items.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-info">
                <div className="item-image">
                  <img src={`http://localhost:5050/${item.image}`} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${parseFloat(item.price).toFixed(2)} × {item.quantity}</p>
                </div>
              </div>
              <div className="item-subtotal">
                ${parseFloat(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-totals">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>${parseFloat(total).toFixed(2)}</span>
          </div>
          <div className="tax">
            <span>Tax (8%)</span>
            <span>${parseFloat(taxAmount).toFixed(2)}</span>
          </div>
          <div className="grand-total">
            <span>Total</span>
            <span>${parseFloat(grandTotal).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h3>Shipping Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "error" : ""}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? "error" : ""}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? "error" : ""}
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Payment Information</h3>
          <div className="payment-methods">
            <div className="payment-method">
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === "credit"}
                onChange={handleChange}
              />
              <label htmlFor="credit">Credit Card</label>
            </div>
            <div className="payment-method">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          
          {formData.paymentMethod === "credit" && (
            <div className="credit-card-form">
              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={errors.cardName ? "error" : ""}
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? "error" : ""}
                  maxLength="19"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardExpiry">Expiry Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={errors.cardExpiry ? "error" : ""}
                    maxLength="5"
                  />
                  {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cardCVC">CVC</label>
                  <input
                    type="text"
                    id="cardCVC"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleChange}
                    placeholder="123"
                    className={errors.cardCVC ? "error" : ""}
                    maxLength="4"
                  />
                  {errors.cardCVC && <span className="error-message">{errors.cardCVC}</span>}
                </div>
              </div>
            </div>
          )}
          
          {formData.paymentMethod === "paypal" && (
            <div className="paypal-info">
              <p>You will be redirected to PayPal to complete your payment.</p>
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="place-order-button" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Place Order - $${parseFloat(grandTotal).toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;