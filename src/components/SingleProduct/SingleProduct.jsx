import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../../store/useCart";
import productsData from "../../data/products.json";
import "./SingleProduct.css";

// CartSidebar Component
const CartSidebar = ({ items, setIsCartOpen, updateQuantity, removeItem }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
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
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      <div className="quality-controls">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="quantity-button"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity + 1))}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="remove-button">
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
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-button">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { items, addItem, removeItem, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productInCart = items.find(item => item.id === parseInt(productId));

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id.toString() === productId);
    setProduct(foundProduct);
    setQuantity(1);
    
    if (foundProduct) {
      const related = productsData
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (productInCart) {
      updateQuantity(product.id, productInCart.quantity + quantity);
    } else {
      addItem({ ...product, quantity });
    }
    toast.success("Added to cart");
  };

  const updateQuantityState = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!product) {
    return (
      <div className="single-product-page">
        <div className="container">
          <div className="loading">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="single-product-page">
      <header className="header">
        <div className="container header-content">
          <h1>SonicShop</h1>
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {items.length > 0 && <span className="cart-count">{items.length}</span>}
          </button>
        </div>
      </header>

      <div className="container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="main-product-image" />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <div className="product-price">${product.price.toFixed(2)}</div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button onClick={() => updateQuantityState(-1)} className="quantity-btn">
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button onClick={() => updateQuantityState(1)} className="quantity-btn">
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn"
                disabled={items.some(item => item.id === product.id)}
              >
                {items.some(item => item.id === product.id) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  to={`/product/${relatedProduct.id}`} 
                  key={relatedProduct.id}
                  className="related-product-card"
                >
                  <div className="product-image-container">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="related-product-image" 
                    />
                  </div>
                  <div className="related-product-info">
                    <h3>{relatedProduct.name}</h3>
                    <p className="related-product-price">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCartOpen && (
        <CartSidebar 
          items={items} 
          setIsCartOpen={setIsCartOpen} 
          updateQuantity={updateQuantity} 
          removeItem={removeItem} 
        />
      )}
    </div>
  );
};

export default SingleProduct;
