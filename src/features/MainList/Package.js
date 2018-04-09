import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { DTypes } from '../../constants';
import { getItemComponent } from '../../utils';

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      items: props.items,
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

class Package extends Component {
  render() {
    const {
      connectDragSource,
      id,
      isDragging,
      items,
      moveItem,
      removeItem,
      name
    } = this.props;

    return connectDragSource(
      <div
        style={{
          backgroundColor: '#eee',
          cursor: 'move',
          margin: '.5em .25em',
          opacity: isDragging ? 0.5 : 1,
          padding: '1em'
        }}
      >
        <h2>{name}</h2>
        <button
          onClick={() => {
            removeItem(id);
          }}
        >
          Delete
        </button>
        {items.map((item, index) => {
          const Comp = getItemComponent(item);

          return (
            <Comp
              index={index}
              key={item.id}
              moveItem={moveItem}
              parent={id}
              removeItem={removeItem}
              {...item}
            />
          );
        })}
      </div>
    );
  }
}

Package.propTypes = {
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

export default DragSource(DTypes.PACKAGE, source, collect)(Package);
