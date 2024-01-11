import React from 'react'
import { useCart } from '../../context/Cart/CartContext'

function Cart() {
  const {cartData} = useCart()
  return (
    <div className="relative py-2 mr-2 text-white">
       {  cartData && cartData.length > 0 ? (
    cartData.map((cartItem) => (

      
            <div className="absolute t-0 left-3" key={cartItem.id}>
              <p className="flex items-center justify-center w-1 h-1 p-3 mt-0 text-white bg-red-500 rounded-full mtext-xs">{cartItem.totalProducts}</p>
            </div>))
    ) : (
      <div className="absolute t-0 left-3">
        <p className="flex items-center justify-center w-1 h-1 p-3 mt-0 text-white bg-red-500 rounded-full mtext-xs">0</p>
      </div>
    )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-2 file:[1.5px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
  )
}

export default Cart