import React from 'react'; 
import './assets/styles.css'; 

export function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }
  
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.product_id} className="product-item">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-image"
            loading="lazy" 
            onError={(e) => { 
              e.target.src = 'https://via.placeholder.com/150'; // Fallback image
            }} 
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(product.product_id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
