import React, { Component } from 'react';

const source = {
  beginDrag(props) {
    return Object.assign({}, props);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class Item extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <li
        style={{
          border: '1px solid black',
          padding: '1em',
          marginBottom: 10,
          opacity: isDragging ? 0.5 : 1
        }}
      >
        {this.props.name}
      </li>
    );
  }
}

export default Item;
