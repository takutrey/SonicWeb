import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  addTestimonial,
  fetchActiveTestimonials,
  reset,
} from "../../lib/testimonialsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const baseUrl = "http://localhost:5050/";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    firstname: "",
    lastname: "",
    company: "",
    position: "",
    comment: "",
    image: null,
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();

  const { testimonial, isLoading } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchActiveTestimonials());
  }, [dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form data when closing modal
    setReviewData({
      firstname: "",
      lastname: "",
      company: "",
      position: "",
      comment: "",
      image: null,
      rating: 0,
    });
    setHoverRating(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewData({
        ...reviewData,
        image: file,
      });
    }
  };

  const handleRatingClick = (rating) => {
    setReviewData({
      ...reviewData,
      rating: rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const testimonialData = {
      firstname: reviewData.firstname,
      lastname: reviewData.lastname,
      company: reviewData.company,
      comment: reviewData.comment,
      position: reviewData.position,
      rating: reviewData.rating,
      image: reviewData.image,
    };

    dispatch(addTestimonial(testimonialData))
      .unwrap()
      .then(() => {
        setShowModal(false);
        toast.success("Review added");
        dispatch(fetchActiveTestimonials());
        dispatch(reset());
      })
      .catch(() => toast.error("Failed to add review"));
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonial.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : "empty"}`}
      >
        ★
      </span>
    ));
  };

  const renderRatingStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const ratingValue = index + 1;
      return (
        <span
          key={index}
          className={`star ${
            ratingValue <= (hoverRating || reviewData.rating)
              ? "filled"
              : "empty"
          }`}
          onClick={() => handleRatingClick(ratingValue)}
          onMouseEnter={() => setHoverRating(ratingValue)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ cursor: "pointer", fontSize: "1.8rem" }}
        >
          ★
        </span>
      );
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonial.length) % testimonial.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {testimonial.length > 0 ? (
        <section className="testimonials-section">
          <div className="testimonials-container">
            <div className="testimonials-section-header">
              <h2>What Our Clients Say</h2>
              <p>
                Don't just take our word for it - hear from some of our
                satisfied customers
              </p>
            </div>

            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonial.map((t) => (
                  <div key={t.id} className="testimonial-slide">
                    <div className="testimonial-card">
                      <div className="testimonial-content">
                        <p>"{t.comment}"</p>
                      </div>

                      <div className="rating">{renderStars(t.rating)}</div>

                      <div className="testimonial-author">
                        <img
                          src={
                            t.image
                              ? `${baseUrl}${t.image}`
                              : "/images/testimonial_fallback.png"
                          }
                          alt={t.firstname}
                          className="author-image"
                        />
                        <div className="author-info">
                          <h4 className="author-name">
                            {t.firstName} {t.lastName}
                          </h4>
                          <p className="author-role">{t.position}</p>
                          <p className="author-company">{t.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-button prev" onClick={goToPrev}>
                &#8249;
              </button>
              <button className="carousel-button next" onClick={goToNext}>
                &#8250;
              </button>

              <div className="carousel-dots">
                {testimonial.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>

            <div className="review-button-container">
              <button onClick={handleShowModal} className="review-button">
                Leave a review
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="review-button-container">
          <button onClick={handleShowModal} className="review-button">
            Leave a review
          </button>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Leave Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={reviewData.firstname}
                    onChange={handleInputChange}
                    className="custom-form-control"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={reviewData.lastname}
                    onChange={handleInputChange}
                    className="custom-form-control"
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Company Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={reviewData.company}
                    onChange={handleInputChange}
                    className="custom-form-control"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Position/Role *</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={reviewData.position}
                    onChange={handleInputChange}
                    className="custom-form-control"
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Your Review *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="comment"
                value={reviewData.comment}
                onChange={handleInputChange}
                required
                placeholder="Share your experience with our service..."
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Rating *</Form.Label>
              <div className="d-flex">{renderRatingStars()}</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Photo (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="custom-form-control"
              />
              <Form.Text className="text-muted">
                This will be displayed alongside your review
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#1a1a1a", borderColor: "#1a1a1a" }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "#c00", borderColor: "#c00" }}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Testimonials;
