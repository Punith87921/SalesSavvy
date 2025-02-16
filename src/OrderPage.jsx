import React, { useState, useEffect } from 'react'; 
import { CategoryNavigation } from './CategoryNavigation'; 
import { Header } from './Header'; 
import { Footer } from './Footer'; 
import './assets/styles.css';

export default function OrdersPage() { 
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [cartCount, setCartCount] = useState(0); 
    const [username, setUsername] = useState(''); 
    const [cartError, setCartError] = useState(false); // State for cart fetch error 
    const [isCartLoading, setIsCartLoading] = useState(true); // State for cart loading

    useEffect(() => { 
        fetchOrders(); 
        if (username) { 
            fetchCartCount(); // Fetch cart count only if username is available 
        } 
    }, [username]); // Re-run cart count fetch if username changes

    const fetchOrders = async () => { 
        try { 
            const response = await fetch('http://localhost:9090/api/orders', { 
                credentials: 'include', 
            }); 
            if (!response.ok) throw new Error('Failed to fetch orders'); 
            const data = await response.json(); 
            setOrders(data.products || []); 
            setUsername(data.username || 'Guest'); // Extract username 
        } catch (err) { 
            setError(err.message); 
        } finally { 
            setLoading(false); 
        } 
    };

    const fetchCartCount = async () => { 
        setIsCartLoading(true); // Set loading state 
        try { 
            const response = await fetch( 
                `http://localhost:9090/api/cart/items/count?username=${username}`,
                { credentials: 'include' }
            ); 
            const count = await response.json(); 
            setCartCount(count); 
            setCartError(false); // Reset error state if successful 
        } catch (error) { 
            console.error('Error fetching cart count:', error); 
            setCartError(true); // Set error state 
        } finally { 
            setIsCartLoading(false); // Remove loading state 
        } 
    };

    return (
        <div>
            <Header 
                cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount} 
                username={username} 
            />
            <h1>Your Orders</h1>
            {loading && <p>Loading orders...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && orders.length === 0 && (
                <p>No orders found. Start shopping now!</p>
            )}
            {!loading && !error && orders.length > 0 && (
                <div>
                    {orders.map((order, index) => (
                        <div key={index}>
                            <p>Order Id: {order.order_id}</p>
                            <p>Product Name: {order.name}</p>
                            <p>Description: {order.description}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Price per Unit: ₹{order.price_per_unit.toFixed(2)}</p>
                            <p>Total Price: ₹{order.total_price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}
