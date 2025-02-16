import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import useravatar from './useravatar.png'; 
import './assets/styles.css'; 

export function ProfileDropdown({ username }) { 
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate(); // Initialize useNavigate hook

    const toggleDropdown = () => { 
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => { 
        try { 
            const response = await fetch('http://localhost:9090/api/auth/logout', { 
                method: 'POST', // Use POST as logout often involves session clearing 
                credentials: 'include', // Include credentials like cookies for authentication 
            });

            if (response.ok) { 
                console.log('User successfully logged out'); 
                navigate('/'); // Redirect to login page 
            } else { 
                console.error('Failed to log out'); 
            } 
        } catch (error) { 
            console.error('Error during logout:', error); 
        }
    };

    const handleOrdersClick = () => { 
        navigate('/orders'); // Navigate to the orders route 
    };

    return (
        <div className="profile-dropdown">
            <img 
                src={useravatar} 
                alt="User Avatar" 
                className="user-avatar" 
                onError={(e) => { e.target.src = 'fallback-logo.png'; }} // Fallback for image 
                onClick={toggleDropdown} // Toggle the dropdown when clicking the avatar
            />
            <span>{username || 'Guest'}</span> {/* Display username or 'Guest' */}

            {isOpen && (
                <div className="dropdown-menu">
                    <button onClick={handleOrdersClick}>Orders</button> {/* Handle Orders Click */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}
