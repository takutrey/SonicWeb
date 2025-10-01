import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus, X } from "lucide-react";
import { toast } from "sonner";
// import { useCart } from "../../store/useCart";
import "./SingleProduct.css";
import { getSingleProduct, getRelatedProducts } from "../../lib/products.jsx";
import PropTypes from "prop-types";
import Footer from "../Footer/Footer.jsx";

const baseUrl = "https://sonicsignal-website.onrender.com";

const CartSidebar = ({ items, setIsCartOpen, updateQuantity, removeItem }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-content">
          <div className="cart-header">
            <h2 className="cart-title">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="close-button"
            >
              <X />
            </button>
          </div>
          <div className="cart-items">
            {items.length === 0 ? (
              <p className="cart-empty">
                Your cart is empty
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="continue-shopping-button"
                >
                  Continue Shopping
                </button>
              </p>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={`${baseUrl}/${item.image}`}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="quantity-button"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity + 1)
                            )
                          }
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-button"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${parseFloat(total).toFixed(2)}</span>
              </div>
              <button className="checkout-button">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CartSidebar.propTypes = {
  items: PropTypes.node,
  setIsCartOpen: PropTypes.func,
  updateQuantity: PropTypes.func,
  removeItem: PropTypes.func,
};

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  // const { items, addItem, removeItem, updateQuantity } = useCart();
  const items = []; // Empty array since cart is disabled
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await getSingleProduct(productId);
        setProduct(response.data || {});
        setCategoryId(response.data?.category?.id);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        if (!categoryId) return; // Ensure categoryId is valid before fetching
        const response = await getRelatedProducts(categoryId, productId); // Pass productId to exclude it
        setRelatedProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }
    if (categoryId) fetchRelated();
  }, [categoryId, productId]); // Ensure it updates when productId changes

  const handleAddToCart = () => {
    // const productInCart = items.find((item) => item.id === product.id);
    // if (productInCart) {
    //   updateQuantity(product.id, productInCart.quantity + quantity);
    // } else {
    //   addItem({ ...product, quantity });
    // }
    // toast.success("Added to cart");
    console.log("Add to cart functionality disabled");
  };

  if (!product) {
    return <div className="loading">Loading product...</div>;
  }

  return (
    <div className="single-product-page">
      <header className="header">
        <div className="container header-content">
          <h1 className="brand-logo">SonicShop</h1>
          {/* <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {items.length > 0 && (
              <span className="cart-count">{items.length}</span>
            )}
          </button> */}
        </div>
      </header>

      <div className="container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="product-details">
          <div className="product-image-section">
            <img
              src={`${baseUrl}/${product.image}`}
              alt={product.name}
              className="main-product-image"
            />
          </div>
          <div className="product-info-section">
            <div className="product-info-content">
              <div className="product-info-left">
                <div className="product-details">
                  <div className="product-details-title">
                    <h2>
                      {product.name}|{product?.brand || ""}
                    </h2>
                    <p className="product-category">
                      {product?.category?.name}
                    </p>
                  </div>
                </div>
                <div className="product-price">${product.price}</div>
                <div className="product-in-stock">
                  <div
                    className="stock-indicator"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {product.stock_status === "In stock" ? (
                      <span
                        style={{
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            height: "10px",
                            width: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                          }}
                        ></div>
                        In Stock
                      </span>
                    ) : product.stock_status === "Pre-order" ? (
                      <span
                        style={{
                          color: "orange",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            height: "10px",
                            width: "10px",
                            borderRadius: "50%",
                            backgroundColor: "orange",
                          }}
                        ></div>
                        Pre-Order
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            height: "10px",
                            width: "10px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                          }}
                        ></div>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="product-description-container">
                  <h2 className="product-description-title">Description</h2>
                  <p className="product-description-details">
                    {product.description}
                  </p>
                </div>
              </div>

              {product.specifications && (
                <div className="product-info-right">
                  <div className="product-specifications">
                    <h3 className="product-specifications-title">
                      Specifications
                    </h3>
                    <ul>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="quantity-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="quantity-btn"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* <button
  onClick={handleAddToCart}
  className="add-to-cart-btn"
  disabled={
    product.stock_status === "Out of stock" ||
    product.stock_status === "Pre-order"
  }
>
  Add to Cart (Disabled)
</button> */}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link
                to={`/product/${relatedProduct.id}`}
                key={relatedProduct.id}
                className="related-product-card"
              >
                <div className="product-image-container">
                  <img
                    src={`${baseUrl}/${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="related-product-image"
                  />
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p className="related-product-price">
                    ${parseFloat(relatedProduct.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* {isCartOpen && (
        <CartSidebar
          items={items}
          setIsCartOpen={setIsCartOpen}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      )} */}
      <div className="single-product-footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default SingleProduct;
