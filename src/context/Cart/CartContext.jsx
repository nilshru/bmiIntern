import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContex";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartQty, setCartQty] = useState(0);
 const  {userData} = useAuth()
 const userID = userData?.id

const fetchCartData = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/carts/user/${userID}`);
    const data = await response.json();

  
    setCartData(data.carts);
 setTotalQuantity(data.total);
//  console.log(data.carts);
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};  


useEffect(() => {
    if (userData) {
      fetchCartData();
    
    }
  }, [userData]);
  
  const handleCartQty = (quantity) => {
    setCartQty(quantity);
};

// this is only for adding functionality because in the server it does not added so i use another api to call the cart data according to the userid


const handleAddToCart = async(id) => {
try {
  const response = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userID,
      products: [
        {
          id:id,
          quantity:cartQty + 1  , 
        },
      ],
    }),
  })

  if (response.ok) {
    const data = await response.json();
console.log(data);

alert(`Product added to cart successfully "Check The Console"
This is only for adding functionality because in the server it does not added so i use another api
"https://dummyjson.com/carts/user/{userID}"
To call the cart data according to the userid`);



  }

} catch (error) {
  console.error('Error adding product to cart:', error);
}

};

  return (
    <CartContext.Provider value={{ cartData, setCartData, totalQuantity, setTotalQuantity, handleAddToCart, handleCartQty }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
