import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  render() {
    return (
      <div
        style={{
          margin: '.5em .25em',
          padding: '1em',
          border: '1px solid green'
        }}
      >
        Option - {this.props.name}
      </div>
    );
  }
}

Option.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  moveItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Option;
