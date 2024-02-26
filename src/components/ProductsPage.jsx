import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './ProductsPage.css'; // Добавляем CSS для стилей и анимаций

const ProductsPage = ({ products, setProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    // Здесь код для загрузки продуктов...
    setLoading(false);
  }, [currentPage, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
      <>
        <Row>
          {loading ? (
              <div className="loader">Загрузка...</div>
          ) : (
              products.map(product => <ProductCard key={product.id} {...product} />)
          )}
        </Row>
        <div className="pagination">
          <Button onClick={() => setCurrentPage(prev => prev - 1)}>Назад</Button>
          <Button onClick={() => setCurrentPage(prev => prev + 1)}>Вперед</Button>
        </div>
      </>
  );
};

export default ProductsPage;
