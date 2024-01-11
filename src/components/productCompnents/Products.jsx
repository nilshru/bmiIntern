import React from 'react';
import ProductCart from './ProductCart';
import PriceFilter from './PriceFilter';
import { useProducts } from '../../context/Product/ProductContext';
import Loader from '../Loader';


function Products() {
  const {
    productsData,
    isLoading,
    handleFilterChange,
    noItemsFound
  } = useProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (noItemsFound) {
    return <>
       <PriceFilter handleFilterChange={handleFilterChange} />

      <div className="flex justify-center w-full">
        <p className="text-2xl font-bold">No products found</p>
      </div>
    </>
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center h-full max-w-8xl">
        <div className="flex justify-center w-full">
          <PriceFilter handleFilterChange={handleFilterChange} />

        </div>
        <div className="flex flex-wrap justify-center w-full">
          {productsData.map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
