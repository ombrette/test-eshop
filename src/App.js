import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

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
        return <li className="Cart-item" key={index}>{item}</li>;
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
    this.handleCartRemoveClick = this.handleCartRemoveClick.bind(this);

    const url = 'https://jsonplaceholder.typicode.com/photos';

    fetch(url).then((resp) => resp.json())
    .then((data)=>{
      let products = data.map((item, index) => {
        return(
          <div className="Product-container" id={index}>
            <img src={item.url} className="Product-image" alt="{item.title}" />
            <h2 className="Product-title">{item.title}</h2>
            <Icon className="Add-to-cart" color="action" onClick={this.handleCartClick} id={index}>+</Icon>
            <button className="Remove-from-cart" onClick={this.handleCartRemoveClick} id={index}>-</button>
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
    const product = this.state.productlist.filter((item, productIndex) => {
      return item.props.id === parseInt(event.target.id)
    })
    product.map((item, index) => {
        this.setState({ cart : [...this.state.cart, item] })
    });
  }

  handleCartRemoveClick(event) {
    const cart = this.state.cart.filter((product, productIndex) => {
      return product.props.id !== parseInt(event.target.id)
    })
    this.setState({ cart })
  }

  render() {
    const { productlist, currentPage, productsPerPage, cart } = this.state;

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

    const cartTotal = cart.length;

    return (
      <main className="Page-content">
        <section className="Products">
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Test eShop
              </Typography>
            </Toolbar>
          </AppBar>
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
          <p>Nombre total d'articles : {cartTotal}</p>
        </aside>
      </main>
    );
  }
}

export default App;
