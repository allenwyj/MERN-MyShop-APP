import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import UserListPage from './pages/admin-pages/UserListPage';
import UserEditPage from './pages/admin-pages/UserEditPage';
import ProductListPage from './pages/admin-pages/ProductListPage';
import ProductEditPage from './pages/admin-pages/ProductEditPage';
import OrderListPage from './pages/admin-pages/OrderListPage';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/profile" exact component={UserProfilePage} />
            <Route path="/shipping" exact component={ShippingPage} />
            <Route path="/placeorder" exact component={PlaceOrderPage} />
            <Route path="/order/:id" exact component={OrderDetailPage} />
            <Route path="/payment" exact component={PaymentPage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/admin/userlist" exact component={UserListPage} />
            <Route path="/admin/orderlist" exact component={OrderListPage} />
            <Route path="/admin/user/:id/edit" exact component={UserEditPage} />
            <Route
              path="/admin/productlist"
              exact
              component={ProductListPage}
            />
            <Route
              path="/admin/product/:id/edit"
              exact
              component={ProductEditPage}
            />
            <Route path="/" component={HomePage} exact />
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
