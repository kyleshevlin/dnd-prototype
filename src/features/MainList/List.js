import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DTypes } from '../../constants';
import Option from './Option';
import Package from './Package';
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

const target = {};

const collect = connect => ({
  connectDropTarget: connect.dropTarget()
});

class List extends Component {
  render() {
    const { connectDropTarget, items, moveItem, removeItem } = this.props;

    return connectDropTarget(
      <div style={{ width: '50%' }}>
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
  items: PropTypes.array.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default DropTarget(
  [DTypes.OPTION, DTypes.PACKAGE, DTypes.PRODUCT],
  target,
  collect
)(List);
