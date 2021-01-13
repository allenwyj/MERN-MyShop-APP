import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import day from 'dayjs';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { listOrders } from '../../redux/order/orderActions';

import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <React.Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>user</th>
              <th>email</th>
              <th>order date</th>
              <th>total price</th>
              <th>paid</th>
              <th>delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.user && order.user.email}</td>
                <td>{day(order.createdAt).format('HH:mm:ss, DD/MM/YYYY')}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    day(order.paidAt).format('HH:mm:ss, DD/MM/YYYY')
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    day(order.deliveredAt).format('HH:mm:ss, DD/MM/YYYY')
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default UserListPage;
