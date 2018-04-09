import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { name } = this.props;

    return (
      <div
        style={{
          padding: '1em',
          margin: '0.25em',
          border: '1px solid black'
        }}
      >
        {name}
      </div>
    );
  }
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  moveItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Product;
