import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemComponent } from '../../utils';

class Package extends Component {
  render() {
    const { items, moveItem, name } = this.props;

    return (
      <div
        style={{
          backgroundColor: '#eee',
          padding: '1em',
          margin: '.5em .25em'
        }}
      >
        <h2>{name}</h2>
        {this.props.items.map((item, index) => {
          const Comp = getItemComponent(item);

          return (
            <Comp index={index} key={item.id} {...item} moveItem={moveItem} />
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
  type: PropTypes.string.isRequired
};

export default Package;
