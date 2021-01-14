import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopRatedProducts } from '../redux/productList/productListActions';

import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, topProducts } = productTopRated;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : topProducts.length !== 0 ? (
    <Carousel pause="hover" className="bg-light" style={{ border: 'none' }}>
      {topProducts.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              className="d-block w-100"
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};

export default ProductCarousel;
