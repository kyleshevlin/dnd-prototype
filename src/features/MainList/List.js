import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DTypes } from '../../constants';
import Option from './Option';
import Package from './Package';
import Product from './Product';
import { sharedHover } from './sharedDnd';

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
  hover(props, monitor) {
    sharedHover(props, monitor);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
});

class List extends Component {
  render() {
    const {
      connectDropTarget,
      isOver,
      items,
      moveItem,
      removeItem
    } = this.props;

    return connectDropTarget(
      <div
        style={{
          backgroundColor: isOver ? 'rgba(0, 255, 255, 0.2)' : 'white',
          width: '50%'
        }}
      >
        <h1>List</h1>
        {items.map((item, index) => {
          const Comp = getItemComponent(item);

          return (
            <Comp
              key={item.id}
              index={index}
              moveItem={moveItem}
              parent="root"
              removeItem={removeItem}
              {...item}
            />
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
  items: PropTypes.array.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default DropTarget(
  [DTypes.OPTION, DTypes.PACKAGE, DTypes.PRODUCT],
  target,
  collect
)(List);
