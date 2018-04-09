import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemComponent } from '../../utils';

class Package extends Component {
  render() {
    const { id, items, moveItem, removeItem, name } = this.props;

    return (
      <div
        style={{
          backgroundColor: '#eee',
          padding: '1em',
          margin: '.5em .25em'
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
        {this.props.items.map((item, index) => {
          const Comp = getItemComponent(item);

          return (
            <Comp
              index={index}
              key={item.id}
              moveItem={moveItem}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Package;
