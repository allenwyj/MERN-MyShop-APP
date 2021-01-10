import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetail, updateUserProfile } from '../redux/user/userActions';
import userActionTypes from '../redux/user/userActionTypes';

const UserProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user, success } = userDetails;

  useEffect(() => {
    // reset
    return () => {
      dispatch({ type: userActionTypes.USER_UPDATE_PROFILE_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    // if there is no currentUser login, then redirect to home page.
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        // /api/users/profile - fetching login user's profile
        dispatch(getUserDetail('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch({ type: userActionTypes.USER_UPDATE_PROFILE_SUCCESS_RESET });
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setMessage(null);
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
      </Col>
    </Row>
  );
};

export default UserProfilePage;
