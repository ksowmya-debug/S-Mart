import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token,setToken] = useState("");
    const [user, setUser] = useState(null); // New state for user data
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('https://s-mart-backend.onrender.com/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const addToCart = (itemId, quantity = 1) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: quantity }))
            toast.success("Added to Cart!");
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }))
            toast.success("Added to Cart!");
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 1) {
                newCartItems[itemId] -= 1;
            } else {
                delete newCartItems[itemId];
            }
            return newCartItems;
        });
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            totalItem += cartItems[item];
        }
        return totalItem;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const clearCart = () => {
        setCartItems({});
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null); // Clear user data on logout
    }

    useEffect(()=>{
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                // Fetch user data if token exists
                try {
                    const { data } = await axios.get('https://s-mart-backend.onrender.com/api/users/profile', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    console.log('User data from profile API:', data);
                    console.log('StoreContext - setting user:', data);
                    setUser(data); // Assuming /api/users/profile returns user data
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to fetch user data.');
                    localStorage.removeItem("token"); // Clear invalid token
                    setToken("");
                }
            }
        }
        loadData();
    },[])

    const contextValue = {
        products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        token,
        setToken,
        user, // Include user in context
        setUser, // Include setUser in context
        logout,
        clearCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;