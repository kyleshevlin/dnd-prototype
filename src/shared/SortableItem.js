import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DTypes } from '../constants';
import { pipe } from '../utils';

const source = {
  beginDrag(props) {
    return Object.assign({}, props);
  }
};

const target = {
  hover(props, monitor, component) {
    const dragItem = monitor.getItem();
    const dragIndex = dragItem.index;
    const hoverIndex = props.index;
    const hasSameParent = props.parent === dragItem.parent;

    // Don't replace items with themselves
    // Must have the same parent to sort
    if (dragIndex === hoverIndex || !hasSameParent) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex, dragItem.parent);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    dragItem.index = hoverIndex;
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

class SortableItem extends Component {
  render() {
    const {
      children,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOverCurrent
    } = this.props;

    const enhance = pipe(connectDropTarget, connectDragSource);

    return enhance(<div>{children({ isDragging, isOverCurrent })}</div>);
  }
}

SortableItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired
};

const enhance = pipe(
  DropTarget(DTypes.SORTABLE, target, targetCollect),
  DragSource(DTypes.SORTABLE, source, sourceCollect)
);

export default enhance(SortableItem);
