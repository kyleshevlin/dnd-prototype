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
    const deepFilter = id => items => {
      const filtered = items.filter(x => x.id !== id);

      if (filtered.length !== items.length) {
        return filtered;
      }

      // otherwise, attempt to go one level deeper
      return items.map(item => {
        if (item.items) {
          item.items = deepFilter(id)(item.items);
        }

        return item;
      });
    };

    const filteredItems = deepFilter(id)(this.state.items);

    console.log(filteredItems);

    this.setState({ items: filteredItems });
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
