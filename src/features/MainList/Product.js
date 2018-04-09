import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { DTypes } from '../../constants';

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      name: props.name,
      parent: props.parent,
      type: props.type
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class Product extends Component {
  render() {
    const { connectDragSource, id, isDragging, name, removeItem } = this.props;

    return connectDragSource(
      <div
        style={{
          border: '1px solid black',
          cursor: 'move',
          margin: '0.25em',
          opacity: isDragging ? 0.5 : 1,
          padding: '1em'
        }}
      >
        {name}
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

Product.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default DragSource(DTypes.PRODUCT, source, collect)(Product);
