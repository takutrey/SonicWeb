import { useState, useMemo, useEffect } from "react";
import "./SonicShop.css";
import { ShoppingCart, X, Search } from "lucide-react";
import { toast } from "sonner";
// import { useCart } from "../../store/useCart.jsx";
import { Link } from "react-router-dom";
import { AllProducts } from "../../lib/products.jsx";
// import CheckoutForm from "../CheckoutForm/CheckoutForm.jsx";

const baseUrl = "https://sonicsignal-website.onrender.com";

const SonicShop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500); // Initial value, will be updated dynamically
  const [productRecord, setProductRecord] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await AllProducts();
      const products = Array.isArray(response.data) ? response.data : [];
      setProductRecord(products);

      if (products.length > 0) {
        const highestPrice = Math.max(
          ...products.map((product) => product.price)
        );
        setMaxPrice((prevMax) =>
          highestPrice !== prevMax ? highestPrice : prevMax
        );
      }
    } catch (error) {
      toast.error("Failed to load products. Please try again later.");
    }
  }

  const categories = Array.from(
    new Set(productRecord.map((product) => product?.category?.name))
  );

  // const { items, addItem, removeItem, updateQuantity } = useCart();
  const items = []; // Empty array since cart is disabled

  const handleAddToCart = (product) => {
    // addItem(product);
    // toast.success("Added to cart");
    console.log("Add to cart functionality disabled");
  };

  const filteredProducts = useMemo(() => {
    return productRecord.filter((product) => {
      const matchesSearch =
        product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product?.category?.name === selectedCategory;
      const matchesPriceRange =
        product?.price >= minPrice && product?.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPriceRange;
    });
  }, [productRecord, searchQuery, selectedCategory, minPrice, maxPrice]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts, itemsPerPage]
  );

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredProducts, currentPage, itemsPerPage]
  );

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutSubmit = (formData) => {
    return new Promise((resolve) => {
      // Here you would normally make an API call
      setTimeout(() => {
        setIsCheckoutOpen(false);
        toast.success("Order placed successfully");
        // {
        //   items.map((item) => removeItem(item.id));
        // }
        resolve();
      }, 1000); // Simulating network delay
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="shop">
      <header className="header">
        <div className="container header-content">
          <h1>SonicShop</h1>
          {/* <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            <span className="cart-count">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </button> */}
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Premium Products</h2>
          <div className="search-filter">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="items-per-page-select"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="30">30</option>
            </select>
            <div className="price-range">
              <label>Price Range</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max={maxPrice} // Use dynamically set maxPrice
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice} // Use dynamically set maxPrice
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
              </div>
              <div className="price-labels">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-grid">
        <div className="container">
          {paginatedProducts.length === 0 ? (
            <div className="no-results">
              <p>No products match your search criteria</p>
            </div>
          ) : (
            <div className="products-container">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div
                    className="product-image-container"
                    style={{ position: "relative" }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="product-link"
                    >
                      <img
                        src={`${baseUrl}/${product.image}`}
                        alt={product.name}
                        className="product-image"
                        style={{
                          display: "block",
                          width: "100%",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>

                    {/* STOCK STATUS BADGE */}
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        backgroundColor:
                          product.stock_status === "In stock"
                            ? "green"
                            : product.stock_status === "Pre-order"
                            ? "orange"
                            : "red",
                        color: "white",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        textTransform: "uppercase",
                      }}
                    >
                      {product.stock_status}
                    </span>
                  </div>

                  <div className="product-info">
                    <Link
                      to={`/product/${product.id}`}
                      className="product-link"
                    >
                      <h3 className="product-name">{product.name}</h3>
                    </Link>

                    {/* Removed old stock indicator */}

                    <p
                      className="product-description"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.description}
                    </p>

                    <p
                      className="product-category"
                      style={{ fontWeight: "bold" }}
                    >
                      {product?.category.name}
                    </p>

                    <div className="product-footer">
                      <span className="product-price">${product.price}</span>

                      {/* <button
  onClick={() => handleAddToCart(product)}
  className="add-to-cart-button"
  disabled={
    items.some((item) => item.id === product.id) ||
    product.stock_status === "Out of stock" ||
    product.stock_status === "Pre-order"
  }
>
  Add to Cart (Disabled)
</button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            First
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Last
          </button>
        </div>
      </section>

      {/* {isCartOpen && (
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
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="checkout-button"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}
      {/* {isCheckoutOpen && (
        <div className={`checkout-overlay ${isCheckoutOpen ? "active" : ""}`}>
          <div className="checkout-sidebar">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="close-button"
            >
              <X />
            </button>
            <CheckoutForm
              onSubmit={handleCheckoutSubmit}
              total={total}
              items={items}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SonicShop;
