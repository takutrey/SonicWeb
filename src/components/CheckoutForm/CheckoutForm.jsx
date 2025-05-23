import React, { useState } from "react";
import { X } from "lucide-react";
import "./CheckoutForm.css";
import axios from "axios";
import {v4 as uuidV4} from 'uuid';


const CheckoutForm = ({ onSubmit, total, items }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    paymentMethod: "credit",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const [orderNumber, setOrderNumber] = useState(null);

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
    if (!formData.province.trim()) newErrors.province = "Province is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    const newOrderNumber = uuidV4();
    setOrderNumber(newOrderNumber);
    return newOrderNumber;
  }


  const addCustomerData = async (orderData) => {
    try {
      const response = await axios.post("https://sonicsignal-website.onrender.com/api/add-customer", orderData);
      console.log("Customer added successfully", response.data);
      return true; 
      
    } catch (error) {
      console.error("Error saving customer", error);
      return false;
      
    }
  }

  const sendEmailInvoice = async (orderData) => {
    try {
      const response = await axios.post("https://sonicsignal-website.onrender.com/api/send-invoice", {
        email: orderData.customer.email,
        orderData: orderData
      });
      console.log("Invoice email sent successfully", response.data);
      return true;

    } catch (error) {
      console.error("Error sending invoice email", error);
      return false;
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const generatedOrderNumber = generateOrderNumber();

    

     // Calculate tax (assuming 8% tax rate)
  const taxRate = 0.08;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount; 

    const orderData = {
      orderNumber: generatedOrderNumber, 
      orderDate: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        country: formData.country,
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      paymentMethod: formData.paymentMethod,
      subtotal: total,
      tax: taxAmount,
      total: grandTotal,
    }; 

    console.log(orderData);

    try {

      console.log("Email sending")
      const emailSent = await sendEmailInvoice(orderData);
      if (!emailSent) {
        console.warn("Order processed but email confirmation failed");
      } 

      const customerSaved = await addCustomerData(orderData); 
      if(!customerSaved){
        console.warn("Customer data not saved")
      }
      
    } catch (error) {
      console.error("Error placing order", error);
      alert("An error occurred while placing your order. Please try again later.");
      
    } finally{
      setIsSubmitting(false);
    }
    
  };

  // Calculate tax (assuming 8% tax rate)
  const taxRate = 0.08;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount;

 if(orderPlaced) {
  return(
    <div className="checkout-success">
    <div className="success-icon">✓</div>
    <h2>Order Placed Successfully!</h2>
    <p>Your order number is: <strong>{orderNumber}</strong></p>
    <p>We've sent a confirmation email to: <strong>{formData.email}</strong></p>
    <p>Thank you for shopping with us!</p>
    <button className="continue-shopping-button" onClick={onClose}>Continue Shopping</button>
  </div>
);
  }

 

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
                  <img src={`https://sonicsignal-website.onrender.com/${item.image}`} alt={item.name} />
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
          <h3>Personal Information</h3>
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
              <label htmlFor="province">Province</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "error" : ""}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>
          
          <div className="form-row">
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
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleChange}
              />
              <label htmlFor="cash">Cash</label>
            </div>
            <div className="payment-method">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              <label htmlFor="card">Card</label>
            </div>
          </div>
        
          
          {formData.paymentMethod === "card" && (
            <div className="paypal-info">
              <p>Card payments are unavailable.</p>
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