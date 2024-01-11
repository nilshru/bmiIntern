import React, { useState } from 'react';
import { useCart } from '../context/Cart/CartContext';

function QuantityBtn() {
const [quantity, setQuantity] = useState(1);
const {handleCartQty} = useCart()
const decreaseQuantity = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
    handleCartQty(quantity-2)
  }
};

function increaseQuantity(){
  if (quantity < 20) {
    setQuantity(quantity + 1);
    handleCartQty(quantity)
    
    }
  };

  return (
    <>
      <div className="flex min-w-24">
        <button type="button" className="h-7 w-7" onClick={decreaseQuantity}>
          -
        </button>
        <input
          type="text"
          className="mx-1 text-center border rounded-md h-7 w-9"
          value={quantity}
          readOnly
        />
        <button type="button" className="flex items-center justify-center h-7 w-7" onClick={(e) => (
          e.preventDefault(),
          increaseQuantity(),
          console.log(quantity)
          ) }>
          +
        </button>
      </div>
    </>
  );
}

export default QuantityBtn;


