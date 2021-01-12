import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserInfo, updateUser } from '../../redux/user/userActions';
import userActionTypes from '../../redux/user/userActionTypes';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

import { Form, Button, Spinner } from 'react-bootstrap';

const UserEditPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = match.params.id;
  const userInfo = useSelector(state => state.userInfo);
  const { loading, error, user } = userInfo;

  const userListModify = useSelector(state => state.userListModify);
  const {
    loading: loadingModify,
    error: errorModify,
    success: successModify
  } = userListModify;

  useEffect(() => {
    return () => dispatch({ type: userActionTypes.USER_INFO_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (successModify) {
      dispatch({ type: userActionTypes.USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserInfo(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successModify]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <React.Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingModify ? (
          <Message variant="info">
            <Spinner as="span" animation="border" size="sm" /> Updating...
          </Message>
        ) : successModify ? (
          <Message variant="success">Success!</Message>
        ) : errorModify ? (
          <Message variant="danger">Updated Fail</Message>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default UserEditPage;
