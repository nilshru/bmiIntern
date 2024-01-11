import React from 'react';

import { useCart } from '../context/Cart/CartContext'; // Adjust the path accordingly
import { Link } from 'react-router-dom';

function Cart() {
  const { cartData } = useCart();
  // console.log(cartData[0].total);
  // if (!cartData || cartData.length === 0) {
  //   return <p>Your cart is empty.</p>;
  // }
  return (
    <>

      <div className="px-2 mx-0 lg:w-7xl lg:px-0">
        <div className="max-w-2xl py-8 mx-auto lg:max-w-7xl">
          <Link to={'/'}> <span className='text-lg font-semibold text-blue-600 underline '> &larr; Go Back</span></Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="rounded-lg shadow-2xl bg-slate-100 lg:col-span-8">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="mx-2 divide-y divide-black ">
                {cartData && cartData.length > 0 ? (
                  cartData.map((cartItem) => (
                    <div key={cartItem.id} className="mx-2 lg:mx-4 ">
                      {cartItem.products.map((product) => (
                        <li key={product.id} className="flex justify-center pt-2 pb-0 sm:pb-0 sm:pt-2 ">
                          <section className="flex flex-col items-center w-[300px] sm:w-full mx-2 mt-2 mb-1 border rounded-md sm:flex-row sm:max-w-7xl bg-slate-50">
                            <div className="w-[300px] h-[260px] sm:w-[380px] bg-slate-200 flex items-center justify-center">
                              <img
                                src={product.thumbnail} // Use the actual product thumbnail
                                alt={product.title}
                                className="object-contain w-full h-full px-2 py-3 rounded-2xl"
                              />
                            </div>
                            <div>
                              <div className="p-4">
                                <h1 className="inline-flex items-center text-lg font-semibold">
                                  {product.title}
                                </h1>

                                <div className="mt-3 space-x-2 ">
                                  <span className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-400 ">
                                      M.R.P.: <span className='line-through'>$.{product.price}</span>
                                    </span>
                                    <span className="font-medium text-gray-600 text- ">
                                      $.{(product.discountedPrice) / product.quantity}
                                    </span>
                                    <span className="text-sm font-medium text-green-500 ">
                                      {Math.round(product.discountPercentage)}% off
                                    </span>
                                    <span className='flex flex-col font-medium text-black'>
                                      Subtotal {`(${product.quantity} items)`}<span className="text-lg font-medium text-gray-900 ">
                                        $.{product.discountedPrice}
                                      </span>

                                    </span>
                                  </span>
                                  <div className="mt-4">
                                    {/* Add your other product details */}
                                    <label htmlFor="quantity">Qty.</label>
                                    <input
                                      type="text"
                                      className="mx-1 text-center border rounded-md h-7 w-9"
                                      value={product.quantity}
                                      readOnly
                                    />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </li>
                      ))}
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md shadow-2xl bg-slate-100 lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className="px-4 py-3 text-lg font-medium text-gray-900 border-b border-black sm:p-4"
              >
                Price Details
              </h2>
              {cartData && cartData.length > 0 ? (
                cartData.map((cartItem) => (
                  <div key={cartItem.id}>
                    <dl className="px-2 py-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">Price ({cartItem.totalQuantity} items)</dt>
                        <dd className="text-sm font-medium text-gray-900">${cartItem.total}</dd>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <dt className="flex items-center text-sm text-gray-800">
                          <span>Discount</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">
                          - ${(cartItem.total - cartItem.discountedTotal)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm text-gray-800">
                          <span>Delivery Charges</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">Free</dd>
                      </div>
                      <div className="flex items-center justify-between py-4 border-black border-dashed border-y">
                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                        <dd className="text-base font-medium text-gray-900">${cartItem.discountedTotal}</dd>
                      </div>
                    </dl>
                    <div className="px-2 pb-4 font-medium text-green-800">
                      You will save ₹ {(cartItem.total - cartItem.discountedTotal)} on this order
                    </div>
                  </div>))
              ) : (
                ''
              )}

            </section>
          </form>
        </div>
      </div>

    </>
  )
}

export default Cart