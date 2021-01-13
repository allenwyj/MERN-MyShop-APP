import React, { useState, useEffect } from 'react';
import axios from 'axios';
import day from 'dayjs';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../redux/order/orderActions';
import orderActionTypes from '../redux/order/orderActionTypes';

const OrderDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const orderDetails = useSelector(state => state.order);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderId = match.params.id;

  useEffect(() => {
    // fetch the order details when the component is mounted
    dispatch(getOrderDetails(orderId));

    // reset the order reducer
    return () => {
      console.log('detail page reset');
      dispatch({ type: orderActionTypes.ORDER_RESET });
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    // add paypal script into the body
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      console.log('Adding Paypal Script');

      // create script tag
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      // reset the orderPay state
      dispatch({ type: orderActionTypes.ORDER_PAY_RESET });

      dispatch({ type: orderActionTypes.ORDER_DELIVER_RESET });

      // re-fetch the order details from the db
      dispatch(getOrderDetails(orderId));
    } else if (order._id && !order.isPaid) {
      console.log('Checking paypal adding...');
      // If paypal script is not added into the body tag
      if (!window.paypal) {
        addPaypalScript();

        // paypal script tag is already in the body tag
      } else {
        console.log('Paypal is already in.');
        // happens when user paid and checkout for other products,
        // change the component state into true.
        setSdkReady(true);
      }
    }
  }, [userInfo, orderId, order, successPay, successDeliver, dispatch, history]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <React.Fragment>
      <Link to="/admin/orderlist" className="btn btn-outline-secondary btn-sm">
        Back
      </Link>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.suburb}{' '}
                {order.shippingAddress.postcode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{' '}
                  {day(order.deliveredAt).format('HH:mm:ss, DD/MM/YYYY')}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {day(order.paidAt).format('HH:mm:ss, DD/MM/YYYY')}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>Created At</Col>
                  <Col>
                    {day(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>${order.gstPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                (loadingDeliver ? (
                  <Loader />
                ) : (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderDetailPage;
