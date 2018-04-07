import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DTypes } from '../constants';
import Product from './Product';

const target = {
  hover(props, monitor, component) {
    const monitorItem = monitor.getItem();
    const dragIndex = monitorItem.index;
    const hoverIndex = props.index;

    // Don't replace item with itself
    if (dragIndex === hoverIndex) {
      return;
    }

    // Get rectangle on screen
    const hoverRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2;

    // Get mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverRect.top;

    // Only perform the move when the mouse has crossed half of the item's height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMidY) {
      return;
    }

    // Upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMidY) {
      return;
    }

    // We good to go from here
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitorItem.index = hoverIndex;
  }
};

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

const source = {
  beginDrag(props) {
    return Object.assign({}, props);
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class Package extends Component {
  constructor(props) {
    super(props);

    this.state = { items: props.items };

    this.fromThis = this.fromThis.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }

  fromThis(id) {
    return this.state.items.map(item => item.id).includes(id);
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
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      name
    } = this.props;

    return connectDropTarget(
      connectDragSource(
        <div
          style={{
            backgroundColor: '#eee',
            padding: '1em',
            margin: '1em',
            opacity: isDragging ? 0 : 1
          }}
        >
          <h2>{name}</h2>
          {this.state.items.map((item, index) => (
            <Product
              fromThis={this.fromThis}
              index={index}
              parentIndex={this.props.index}
              key={item.id}
              moveItem={this.moveItem}
              {...item}
            />
          ))}
        </div>
      )
    );
  }
}

export default DropTarget(DTypes.PACKAGE, target, targetCollect)(
  DragSource(DTypes.PACKAGE, source, sourceCollect)(Package)
);
