import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { DTypes } from '../../constants';
import { pipe } from '../../utils';
import Option from './Option';
import Product from './Product';

const getItemComponent = item => {
  switch (item.type) {
    case 'option':
      return Option;

    case 'package':
      return Package;

    case 'product':
      return Product;

    default:
      return null;
  }
};

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

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const target = {};

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

class Package extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      id,
      isDragging,
      items,
      moveItem,
      removeItem,
      name
    } = this.props;

    const enhance = pipe(connectDropTarget, connectDragSource);

    return enhance(
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
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

const enhance = pipe(
  DragSource(DTypes.PACKAGE, source, sourceCollect),
  DropTarget(
    [DTypes.OPTION, DTypes.PACKAGE, DTypes.PRODUCT],
    target,
    targetCollect
  )
);

export default enhance(Package);
