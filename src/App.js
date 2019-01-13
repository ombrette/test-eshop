import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ProductList = props => {
  const isEmpty = !!props.products && props.products.length === 0;
  return (
    <ul>
      {isEmpty && (
        <li>
          <span>Aucun produit existant!</span>
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
      currentPage: 1,
      productsPerPage: 15
    };

    this.handleClick = this.handleClick.bind(this);

    const url = 'https://jsonplaceholder.typicode.com/photos';

    fetch(url).then((resp) => resp.json())
    .then((data)=>{
      let products = data.map((item, index) => {
        return(
          <div className="Product-container" id={index}>
            <img src={item.url} className="Product-image" alt="Image du produit" />
            <h2 className="Product-title">{item.title}</h2>
            <button className="Add-to-cart" onClick={this.handleClick}>+</button>
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
      <div>
        <h1 className="Page-title">Test eShop</h1>
        <section>
          <ul class="Products-list">
            {renderProducts}
          </ul>
          <ul class="Page-numbers">
            {renderPageNumbers}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
