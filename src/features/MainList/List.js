import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemComponent } from '../../utils';

class List extends Component {
  render() {
    const { items, moveItem, removeItem } = this.props;

    return (
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
  items: PropTypes.array.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default List;
