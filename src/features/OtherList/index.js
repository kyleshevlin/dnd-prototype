import React, { Component } from 'react';
import Item from './Item';

class OtherList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item => <Item key={item.id} {...item} />)}
        </ul>
      </div>
    );
  }
}

export default OtherList;
