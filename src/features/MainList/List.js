import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemComponent } from '../../utils';

class List extends Component {
  render() {
    const { items, moveItem } = this.props;

    return (
      <div style={{ width: '50%' }}>
        <h1>List</h1>
        {items.map(item => {
          const Comp = getItemComponent(item);

          return <Comp key={item.id} {...item} moveItem={moveItem} />;
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
