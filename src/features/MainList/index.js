import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';

class MainList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };

    this.addItem = this.addItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(item) {
    this.setState({
      items: [...this.state.items, item]
    });
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

  removeItem(id) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id === id);

    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)]
    });
  }

  render() {
    return (
      <List
        addItem={this.addItem}
        items={this.state.items}
        moveItem={this.moveItem}
        removeItem={this.removeItem}
      />
    );
  }
}

MainList.propTypes = {
  items: PropTypes.array.isRequired
};

MainList.defaultProps = {
  items: []
};

export default MainList;
