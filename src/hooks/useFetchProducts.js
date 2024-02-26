import { useState, useCallback } from 'react';
import axios from 'axios';
import md5 from 'md5';

const useFetchProducts = (initialAction, initialParams) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchProducts = useCallback(async (action, params) => {
    setIsLastPage(false);
    setLoading(true);
    let uniqueProducts = [];
    let attempts = 0;
    const maxAttempts = 5;
    
    while (uniqueProducts.length < 50 && attempts < maxAttempts) {
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const authHeader = md5(`Valantis_${timestamp}`);
      const offset = (currentPage - 1) * 50 + attempts * 50;
      const paramsWithOffset = { ...params, offset, limit: 50 };
      
      try {
        const { data: { result } } = await axios.post('http://api.valantis.store:40000/', { action, params: paramsWithOffset }, {
          headers: { 'X-Auth': authHeader },
        });
        
        if (result.length < 50) {
          setIsLastPage(true);
        }
        
        const filteredIds = [...new Set(result)];
        if (filteredIds.length > 0) {
          const res = await axios.post('http://api.valantis.store:40000/', { action: 'get_items', params: { ...params, ids: filteredIds } }, {
            headers: { 'X-Auth': authHeader },
          });
          uniqueProducts = [...new Set([...uniqueProducts, ...(res.data.result || [])])];
        }
      } catch (error) {
        if (error?.response?.data) {
          console.log('Error ID: ', error.response?.data)
          fetchProducts(action, params);
        }
        setError(error);
        break;
      } finally {
        setLoading(false);
      }
      attempts++;
    }
    
    setProducts(uniqueProducts.slice(0, 50));
  }, [currentPage]);
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  return { currentPage, products, loading, error, isLastPage, handlePrevPage, handleNextPage };
};

export default useFetchProducts;