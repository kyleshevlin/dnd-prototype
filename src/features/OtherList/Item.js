import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { DTypes } from '../../constants';

const colorByType = type => {
  const red = type === DTypes.OPTION ? 255 : 0;
  const green = type === DTypes.PACKAGE ? 255 : 0;
  const blue = type === DTypes.PRODUCT ? 255 : 0;

  return `rgba(${red}, ${green}, ${blue}, 0.2`;
};

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      items: props.items || null,
      parent: 'sideList',
      type: props.type
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class Item extends Component {
  render() {
    const { connectDragSource, isDragging, name, type } = this.props;

    return connectDragSource(
      <li
        style={{
          backgroundColor: colorByType(type),
          border: '1px solid black',
          cursor: 'move',
          padding: '1em',
          marginBottom: 10,
          opacity: isDragging ? 0.5 : 1
        }}
      >
        {type} - {name}
      </li>
    );
  }
}

export default DragSource(DTypes.SIDELIST_ITEM, source, collect)(Item);
