import React, {useState, useMemo} from "react";
import '../SonicShop/SonicShop.css'
import { ShoppingCart, X, Search } from "lucide-react";
import {toast} from 'sonner'; 
import { useCart } from "../../store/useCart";
import productsData from "../../data/products.json";


const categories = Array.from(new Set(productsData.map(product => product.category)));


const SonicShop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(500);

  const {items, addItem, removeItem, updateQuantity } = useCart();

  const handleAddToCart = (product) => {
    addItem(product); 
    toast.success("Added to cart");
  } 

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()); 
      const matchesCategory = !selectedCategory || product.category === selectedCategory; 
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]); 

  const totalPages = useMemo(() => Math.ceil(filteredProducts.length / itemsPerPage), [filteredProducts, itemsPerPage]);
  const paginatedProducts = useMemo(() => filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredProducts, currentPage, itemsPerPage]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0); 

  const handleNextPage = () => {
    if(currentPage < totalPages) { 
      setCurrentPage(currentPage + 1);
    }
  }; 

  const handlePreviousPage = () => {
    if(currentPage > 1){ 
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="shop">
      <header className="header">
        <div className="container header-content">
          <h1>SonicShop</h1>
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {items.length > 0 && <span className="cart-count">{items.length}</span>}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Premium Products</h2>
          <div className="search-filter">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="items-per-page-select">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="30">30</option>
            </select>
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
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">{product.category}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span> 
                      <button onClick={() => handleAddToCart(product)} className="add-to-cart-button" disabled={items.some(item => item.id === product.id)}>{items.some(item => item.id === product.id) ? 'Added to Cart' : 'Add to Cart'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">Previous</button>
            <span className="page-info">Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
              Next
            </button>
          </div>

      </section> 

      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-content">
              <div className="cart-header">
                <h2 className="cart-title">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="close-button">
                  <X />
                </button>
              </div>
              <div className="cart-items">
                {items.length === 0 ? (
                  <p className="cart-empty">Your cart is empty</p>
                ) : (
                  <div>
                    {items.map((item) => {
                      return(
                        <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <h3 className="cart-item-name">{item.name}</h3>
                          <p className="cart-item price">${item.price.toFixed(2)}</p>
                          <div className="quality-controls">
                            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="quantity-button"> - </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity + 1))} className="quantity-button"> + </button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="remove-button">
                          <X />
                        </button>
                      </div>
                      )
                      
                    })}
                  </div>
                )}
              </div>
              {items.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button className="checkout-button">Checkout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )

};

export default SonicShop;
