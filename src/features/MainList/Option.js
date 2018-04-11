import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  render() {
    const { id, isDragging, isOverCurrent, name, removeItem } = this.props;

    return (
      <div
        style={{
          border: isOverCurrent ? '1px solid red' : '1px solid green',
          cursor: 'move',
          margin: '.75em',
          opacity: isDragging ? 0.25 : 1,
          padding: '1em'
        }}
      >
        Option - {name}
        <button
          onClick={() => {
            removeItem(id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

Option.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Option;
