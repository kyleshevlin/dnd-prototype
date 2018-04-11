import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DTypes } from '../../constants';
import Option from './Option';
import Package from './Package';
import Product from './Product';
import SortableItem from '../../shared/SortableItem';

const getItemComponent = item => {
  switch (item.type) {
    case DTypes.OPTION:
      return Option;

    case DTypes.PACKAGE:
      return Package;

    case DTypes.PRODUCT:
      return Product;

    default:
      return null;
  }
};

const target = {
  drop(props, monitor, component) {
    const acceptableTypes = [DTypes.OPTION, DTypes.PRODUCT];
    const item = monitor.getItem();

    const isAcceptable = acceptableTypes.includes(item.type);
    const isIncluded = props.items.map(x => x.id).includes(item.id);
    const wasDroppedOnChild = monitor.didDrop();

    if (isAcceptable && !isIncluded && !wasDroppedOnChild) {
      // props.addItem(item);
    }
  },

  hover(props, monitor) {}
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

class List extends Component {
  render() {
    const {
      connectDropTarget,
      isOver,
      isOverCurrent,
      items,
      moveItem,
      removeItem
    } = this.props;

    return connectDropTarget(
      <div
        style={{
          backgroundColor: isOverCurrent ? 'rgba(0, 255, 255, 0.2)' : 'white',
          width: '50%'
        }}
      >
        <h1>List</h1>
        {items.map((item, index) => {
          const Comp = getItemComponent(item);

          return (
            <SortableItem
              key={item.id}
              index={index}
              moveItem={moveItem}
              parent="root"
            >
              {({ isDragging, isOverCurrent }) => (
                <Comp
                  index={index}
                  isDragging={isDragging}
                  isOverCurrent={isOverCurrent}
                  moveItem={moveItem}
                  parent="root"
                  removeItem={removeItem}
                  {...item}
                />
              )}
            </SortableItem>
          );
        })}
      </div>
    );
  }
}

List.propTypes = {
  addItem: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default DropTarget(
  [DTypes.OPTION, DTypes.PACKAGE, DTypes.PRODUCT, DTypes.SIDELIST_ITEM],
  target,
  collect
)(List);
