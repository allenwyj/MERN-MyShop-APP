import React, { useState, useEffect } from 'react';
import day from 'dayjs';
import { Table, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetail, updateUserProfile } from '../redux/user/userActions';
import userActionTypes from '../redux/user/userActionTypes';
import { listMyOrders } from '../redux/order/orderActions';

const UserProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const currentUser = useSelector(state => state.currentUser);
  const { loading, error, userInfo, success } = currentUser;

  const orderMyList = useSelector(state => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  // componentWillUnmount
  useEffect(() => {
    // /api/users/profile - fetching login user's profile
    dispatch(getUserDetail('profile'));
    dispatch(listMyOrders());

    // reset
    return () => {
      dispatch({ type: userActionTypes.USER_CLEAR_ERROR });
    };
  }, [dispatch]);

  useEffect(() => {
    // if there is no currentUser login, then redirect to home page.
    if (!userInfo) {
      history.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, history, userInfo]);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch({ type: userActionTypes.USER_CLEAR_ERROR });
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
      setMessage(null);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger"> {message}</Message>}
        {error && <Message variant="danger"> {error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* TODO: add address form */}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className={'table-sm'}>
            <thead>
              <tr>
                <th>id</th>
                <th>date</th>
                <th>total</th>
                <th>paid</th>
                <th>delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{day(order.createdAt).format('DD/MM/YYYY HH:MM:ss')}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      day(order.paidAt).format('DD/MM/YYYY HH:MM:ss')
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <Row>{order.isDelivered}</Row>
                        <Row>{order.isDelivered}</Row>
                      </>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserProfilePage;
