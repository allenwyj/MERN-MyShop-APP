import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import day from 'dayjs';

import Rating from './Rating';
import Loader from './Loader';
import Message from './Message';

import {
  getProductReviews,
  createProductReview
} from '../redux/productList/productListActions';

import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import productListActionTypes from '../redux/productList/productListActionTypes';

const ReviewSection = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector(state => state.currentUser);

  const {
    reviews,
    isLoading: loadingReviews,
    success: successReviews,
    error: errorReviews
  } = useSelector(state => state.productReviews);

  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate
  } = useSelector(state => state.productReviewCreate);

  useEffect(() => {
    dispatch(getProductReviews(id));

    return () => {
      dispatch({ type: productListActionTypes.PRODUCT_REVIEW_CREATE_RESET });
      dispatch({ type: productListActionTypes.PRODUCT_REVIEWS_GET_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      alert('Review Submitted!');
      setRating(5);
      setComment('');
      dispatch({ type: productListActionTypes.PRODUCT_REVIEW_CREATE_RESET });
      // refetching reviews after the creation
      dispatch(getProductReviews(id));
    }
  }, [dispatch, successCreate]);

  const submitHandler = e => {
    e.preventDefault();

    if (comment.trim().length === 0) {
      dispatch({
        type: productListActionTypes.PRODUCT_REVIEW_CREATE_FAIL,
        payload: 'Comment cannot be empty!'
      });
      return;
    }

    dispatch(
      createProductReview(id, {
        rating,
        comment
      })
    );
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Reviews</h2>
        {loadingReviews ? (
          <Loader />
        ) : errorReviews ? (
          <Message>{errorReviews}</Message>
        ) : (
          <ListGroup variant="flush">
            {reviews.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{day(review.createdAt).format('DD/MM/YYYY')}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))
            )}

            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  {errorCreate && (
                    <Message variant="danger">{errorCreate}</Message>
                  )}
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={e => setRating(e.target.value)}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loadingCreate}
                  >
                    {loadingCreate ? 'Submitting...' : 'Submit'}
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review.
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default ReviewSection;
