import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DTypes } from '../../constants';
import Option from './Option';
import Product from './Product';
import SortableItem from '../../shared/SortableItem';

const getItemComponent = item => {
  switch (item.type) {
    case DTypes.OPTION:
      return Option;

    case DTypes.PRODUCT:
      return Product;

    default:
      return null;
  }
};

class Package extends Component {
  constructor() {
    super();

    this.renderList = this.renderList.bind(this);
  }

  render() {
    const {
      id,
      isDragging,
      isOverCurrent,
      items,
      moveItem,
      removeItem,
      name
    } = this.props;

    return (
      <div
        style={{
          backgroundColor: isOverCurrent ? 'rgba(0, 255, 0, 0.2)' : '#eee',
          cursor: 'move',
          margin: '.75em',
          opacity: isDragging ? 0.25 : 1,
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
        {this.renderList()}
      </div>
    );
  }

  renderList() {
    const { id, items, moveItem, removeItem } = this.props;

    return items.map((item, index) => {
      const Comp = getItemComponent(item);

      return (
        <SortableItem
          key={item.id}
          index={index}
          moveItem={moveItem}
          parent={id}
        >
          {({ isDragging, isOverCurrent }) => (
            <Comp
              index={index}
              isDragging={isDragging}
              isOverCurrent={isOverCurrent}
              moveItem={moveItem}
              parent={id}
              removeItem={removeItem}
              {...item}
            />
          )}
        </SortableItem>
      );
    });
  }
}

Package.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Package;
