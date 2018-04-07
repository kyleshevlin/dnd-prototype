import React, { Component } from 'react';
import Package from './Package';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };

    this.moveItem = this.moveItem.bind(this);
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];
    const hoverItem = items[hoverIndex];

    this.setState({
      items: items.map((item, index) => {
        switch (index) {
          case dragIndex:
            return hoverItem;

          case hoverIndex:
            return dragItem;

          default:
            return item;
        }
      })
    });
  }

  render() {
    return (
      <div>
        <h1>List</h1>
        {this.state.items.map((pkg, index) => (
          <Package
            key={pkg.name}
            index={index}
            moveItem={this.moveItem}
            {...pkg}
          />
        ))}
      </div>
    );
  }
}

export default List;
