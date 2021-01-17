import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Spinner } from 'react-bootstrap';

import { deleteUser, listUsers } from '../../redux/user/userActions';
import userActionTypes from '../../redux/user/userActionTypes';

import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Paginate from '../../components/Paginate';

const UserListPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const userList = useSelector(state => state.userList);
  const { loading, error, users, pages, page } = userList;

  const userListModify = useSelector(state => state.userListModify);
  const {
    loading: modifyLoading,
    error: modifyError,
    success: modifySuccess
  } = userListModify;

  useEffect(() => {
    return () => {
      dispatch({ type: userActionTypes.USER_DELETE_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, modifySuccess, pageNumber]);

  const deleteHandler = id => {
    if (window.confirm('Confirm to delete user: ' + id)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <React.Fragment>
      {modifyLoading ? (
        <Message variant="info">
          <Spinner as="span" animation="border" size="sm" /> Updating...
        </Message>
      ) : modifySuccess ? (
        <Message variant="success">Success!</Message>
      ) : modifyError ? (
        <Message variant="danger">Updated Fail</Message>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Users</h1>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                      disabled={user._id === userInfo._id}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            isAdmin
            pages={pages}
            page={page}
            paginateList={'userlist'}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default UserListPage;
