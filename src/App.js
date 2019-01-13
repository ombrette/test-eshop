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
      value: '',  
      productlist: []
    };

    const url = 'https://jsonplaceholder.typicode.com/photos';

    fetch(url).then((resp) => resp.json())
    .then((data)=>{
      let products = data.map((item, index) => {
        return(
          <div id={index}>
            <img src={item.thumbnailUrl} className="Product-image" alt="Image du produit" />
            <h2>{item.title}</h2>
            <button onClick={this.handleClick}>+</button>
          </div>
        )
      });
      this.setState({ productlist: products });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>Test eShop</h1>
        <ProductList products={this.state.productlist} />
      </div>
    );
  }
}

export default App;
