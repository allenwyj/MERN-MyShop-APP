import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomePage} exact />
            <Route path="/product/:id" component={ProductPage} />
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
