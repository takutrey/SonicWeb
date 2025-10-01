import React, { useRef, useState } from "react";
import { FaFacebookF, FaWhatsapp, FaPhone, FaLinkedinIn } from "react-icons/fa";
import "../Contact/ContactUs.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const baseUrl = "https://sonicsignal-website.onrender.com/api";

const Contact = () => {
  const recaptchaRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (recaptchaRef.current) {
        recaptchaRef.current.execute();
      } else {
        throw new Error("ReCAPTCHA not loaded");
      }
    } catch (error) {
      console.error("ReCAPTCHA error:", error);
      setIsSubmitting(false);
      setSubmitStatus({ success: false, message: "Verification failed" });
    }
  };

  const onChange = async (token) => {
    if (!token) {
      setIsSubmitting(false);
      setSubmitStatus({ success: false, message: "Verification failed" });
      return;
    }

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      token,
    };

    try {
      const response = await axios.post(`${baseUrl}/contactus`, data);

      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully!",
        });
      } else {
        throw new Error(response.data.error || "Failed to send message");
      }

      formRef.current.reset();
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to send message. Please try again later.";

      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  return (
    <div>
      <section className="hero-contact">
        <div className="hero-contact-content">
          <h1>Contact Us</h1>
          <p>Have any questions or inquiries? Feel free to reach out to us.</p>
          <a
            href="mailto:info@sonicsignals.co.zw"
            className="hero-contact-cta-button"
          >
            Get in Touch
          </a>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/SONICSIGNALSTECH"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/+263713346159"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+2638612855755"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon voip"
            >
              <FaPhone />
            </a>
            <a
              href="https://www.linkedin.com/company/sonicsignal-tech/?originalSubdomain=zw"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-container">
        <div className="map-container">
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.371809527198!2d31.053119873848413!3d-17.821196976117836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5002eacbc95%3A0x92aff4331586a658!2sSonicsignal%20Technologies!5e0!3m2!1sen!2szw!4v1740665843503!5m2!1sen!2szw"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Contact Form</h2>
          {submitStatus && (
            <div
              className={`alert ${submitStatus.success ? "success" : "error"}`}
            >
              {submitStatus.message}
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>

            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={import.meta.env.VITE_RECAPTCHA_CLIENT_SITE_KEY}
              onChange={onChange}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
