import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [productsData, setProductsData] = useState([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const BASE_URL = 'https://dummyjson.com';

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/products?limit=0&skip=0`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();

        setProductsData(data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
    if (appliedFilters.includes(filter)) {
      setAppliedFilters(appliedFilters.filter((item) => item !== filter));
    } else {
      setAppliedFilters([...appliedFilters, filter]);
    }
  };

  const filterProducts = (product) => {
    const titleMatch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !searchQuery || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const brandMatch = !searchQuery || product.brand.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesSearchQuery = titleMatch || categoryMatch || brandMatch;
  
    if (!matchesSearchQuery) {
      return false; // Filter out products that don't match the search query in title, category, or brand
    }
  
    if (appliedFilters.length === 0) {
      return true; // Show all products if no filters applied and matches search query
    }
  
    // Apply price filters
    if (
      (appliedFilters.includes('below_20') && product.price < 21) ||
      (appliedFilters.includes('below_100') && product.price < 101) ||
      (appliedFilters.includes('below_200') && product.price < 201) ||
      (appliedFilters.includes('below_1000') && product.price < 1000) ||
      (appliedFilters.includes('below_1500') && product.price < 1500) ||
      (appliedFilters.includes('below_3000') && product.price < 3000) 

    ) {
      return true; // Match products based on price filters
    }
  
    return false; // Filter out products that don't match applied filters
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = productsData.filter((product) => filterProducts(product));

  const noItemsFound = !filteredProducts.some(product => filterProducts(product));

  // Adding a check for no items found and displaying a message in UI if needed
  

  return (
    <ProductContext.Provider
      value={{
        productsData: filteredProducts,
        isLoading,
        handleFilterChange,
        handleSearch,
        appliedFilters,
        searchQuery,
        noItemsFound
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProducts() {
  return useContext(ProductContext);
}

export { ProductProvider, useProducts };
