import React, { useEffect, useState } from 'react';

import QuantityBtn from '../QuantityBtn';

import './CartBtn.css'
import { useCart } from '../../context/Cart/CartContext';
function ProductCart({ product }) {
  const { price, title, description, category, brand, stock, discountPercentage, thumbnail, images, rating, id } = product;
  const discountPrice = price - (price * discountPercentage) / 100;
  const [previousImage, setPreviousImage] = useState(thumbnail);
  const [imageLoaded, setImageLoaded] = useState(false);
 
const {handleAddToCart} = useCart()
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setPreviousImage(thumbnail);
  }, [thumbnail]);

  function handelChangeImage(image) {
    setPreviousImage(image);
  }

  

  return (
    <section className='flex flex-col items-center w-[300px] sm:w-full mx-2 mt-2 mb-1 border rounded-md shadow-2xl sm:max-w-sm sm:flex-col bg-slate-50'>
      <div className="w-[300px] h-[260px] sm:w-[380px] bg-slate-200 flex items-center justify-center">
        <img
          src={previousImage}
          alt="Laptop"
          className={`object-contain w-full h-full px-2 py-3 rounded-2xl ${!imageLoaded ? 'animate-pulse' : ''}`}
          onLoad={handleImageLoad}
        />
      </div>

      <div className='flex w-full text-left '>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">{title}</h1>
          <p className="mt-3 text-sm text-gray-600">{description}</p>

          <div className="mt-3 space-x-2 ">
            <span className="flex flex-col">
              <span className="text-xs font-medium text-gray-400 ">
                M.R.P.: <span className='line-through'> ${price}</span>
              </span>
              <span className="text-xs font-medium text-black ">
                Rating : {rating} <span className='text-yellow-600 text-[15px] '>&#9733;</span>
              </span>
              <span className="text-sm font-medium text-green-500 ">{Math.round(discountPercentage)}% off</span>
              <span className="text-sm font-medium text-gray-900 ">
                $ <span className='text-lg '> {Math.round(discountPrice)}</span>
              </span>
            </span>
            <div className="inline-flex items-center space-x-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className="w-10 h-10 rounded-full cursor-pointer bg-slate-200 hover:scale-125 active:scale-125 focus:scale-125"
                  onClick={() => handelChangeImage(image)}
                />
              ))}
            </div>
            <div className="mt-4">
              <span className="mb-2 mr-2 inline-block rounded-full bg-orange-200 px-3 py-1 text-[10px] font-semibold text-gray-900">
                {stock > 0 && stock <= 40 ? 'Only few left' : 'In Stock'}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-orange-200 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #{brand}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-orange-200 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #{category}
              </span>
            </div>
            <span className="flex flex-row mt-1">
              <QuantityBtn />
              <button className="CartBtn"
                onClick={(e) =>(
                  e.preventDefault(),
                  handleAddToCart(id))}
       
        >
            <span className="IconContainer">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"  className="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
            </span>
            <p className="text">Add to Cart</p>
        </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCart;
