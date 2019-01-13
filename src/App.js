import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Cart = props => {
  const isEmpty = !!props.products && props.products.length === 0;
  return (
    <ul className="Cart-list">
      {isEmpty && (
        <li className="Cart-item">
          <span>Votre panier est vide!</span>
        </li>
      )}
      {!!props.products && props.products.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productlist: [],
      cart: [],
      currentPage: 1,
      productsPerPage: 15
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);

    const url = 'https://jsonplaceholder.typicode.com/photos';

    fetch(url).then((resp) => resp.json())
    .then((data)=>{
      let products = data.map((item, index) => {
        return(
          <div className="Product-container" id={index}>
            <img src={item.url} className="Product-image" alt="Image du produit" />
            <h2 className="Product-title">{item.title}</h2>
            <button className="Add-to-cart" onClick={this.handleCartClick} id={index}>+</button>
          </div>
        )
      });
      this.setState({ productlist: products });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleCartClick(event) {
    const cart = this.state.cart.slice(0);

    cart.push(this.state.productlist[event.target.id])

    this.setState({
      cart: cart
    });
  }

  render() {
    const { productlist, currentPage, productsPerPage } = this.state;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productlist.slice(indexOfFirstProduct, indexOfLastProduct);

    const renderProducts = currentProducts.map((product, index) => {
      return <li key={index} className="Product-item">{product}</li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(productlist.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className="Page-number"
        >
          {number}
        </li>
      );
    });

    return (
      <main className="Page-content">
        <section className="Products">
          <h1 className="Page-title">Test eShop</h1>
          <ul className="Products-list">
            {renderProducts}
          </ul>
          <ul className="Page-numbers">
            {renderPageNumbers}
          </ul>
        </section>
        <aside className="Cart">
          <p className="Cart-title">Votre panier</p>
          <Cart products={this.state.cart} />
        </aside>
      </main>
    );
  }
}

export default App;
