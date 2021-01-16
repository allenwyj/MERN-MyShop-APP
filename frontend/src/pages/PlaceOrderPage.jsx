import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/order/orderActions';
import orderActionTypes from '../redux/order/orderActionTypes';
import cartActionTypes from '../redux/cart/cartActionTypes';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { order, loading, success, error } = useSelector(state => state.order);

  useEffect(() => {
    dispatch({ type: orderActionTypes.ORDER_PAGE_INITIAL_FINISH });

    return () => {
      // cleanup the status of order_create if user leaves place order page
      // with error message or change of mind.
      dispatch({ type: orderActionTypes.ORDER_RESET });
    };
  }, [dispatch]);

  // jump to the order detail page if placing order is successful
  useEffect(() => {
    if (success) {
      dispatch({ type: cartActionTypes.CART_CLEAR });
      localStorage.setItem('cartItems', '[]');
      dispatch({ type: orderActionTypes.ORDER_RESET });

      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  // Check whether the error from api is normal error text,
  // or, it's the out of stock error
  const errorInStocks = error => {
    error = typeof error !== 'string' ? JSON.stringify(error) : error;
    try {
      error = JSON.parse(error);
    } catch (e) {
      return false;
    }

    // if error is an object, not null and contains hasValue property
    if (typeof error === 'object' && error && error.hasValue) {
      console.log(error.hasValue);
      delete error.hasValue;
      const shortInStockItemNames = Object.values(error);
      return shortInStockItemNames;
    }

    return false;
  };

  // calculate total prices in the cart
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.gstPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.gstPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    if (!cart.paymentMethod) {
      dispatch({
        type: orderActionTypes.ORDER_CREATE_FAIL,
        payload: 'Payment method is empty!'
      });
    } else if (!cart.shippingAddress) {
      dispatch({
        type: orderActionTypes.ORDER_CREATE_FAIL,
        payload: 'Shipping address is empty!'
      });
    } else {
      const { cartItems, ...rest } = cart;
      dispatch(
        createOrder({
          orderItems: cartItems,
          ...rest
        })
      );
    }
  };

  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.suburb}{' '}
                {cart.shippingAddress.postcode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>${cart.gstPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && errorInStocks(error) ? (
                  <Message variant="danger">
                    Out of stock: {errorInStocks(error).join()}
                  </Message>
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : null}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0 || loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? 'Submitting...' : 'Place Order'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrderPage;
