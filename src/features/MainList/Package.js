import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { sharedHover } from './sharedDnd';
import { DTypes } from '../../constants';
import { pipe } from '../../utils';
import Option from './Option';
import Product from './Product';

const getItemComponent = item => {
  switch (item.type) {
    case DTypes.OPTION:
      return Option;

    case DTypes.PRODUCT:
      return Product;

    default:
      return null;
  }
};

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      items: props.items,
      name: props.name,
      parent: props.parent,
      type: props.type
    };
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const target = {
  drop(props, monitor) {
    console.log(props.id);
    console.log(monitor.getItem());
  },

  hover(props, monitor) {
    sharedHover(props, monitor);
  }
};

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

class Package extends Component {
  constructor() {
    super();

    this.renderList = this.renderList.bind(this);
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      id,
      isDragging,
      isOver,
      isOverCurrent,
      items,
      moveItem,
      removeItem,
      name
    } = this.props;

    const enhance = pipe(connectDropTarget, connectDragSource);

    return enhance(
      <div
        style={{
          backgroundColor: isOverCurrent ? 'rgba(0, 255, 0, 0.2)' : '#eee',
          cursor: 'move',
          margin: '.75em',
          opacity: isDragging ? 0.5 : 1,
          padding: '1em'
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
        {this.renderList()}
      </div>
    );
  }

  renderList() {
    const { id, items, moveItem, removeItem } = this.props;

    return items.map((item, index) => {
      const Comp = getItemComponent(item);

      return (
        <Comp
          index={index}
          key={item.id}
          moveItem={moveItem}
          parent={id}
          removeItem={removeItem}
          {...item}
        />
      );
    });
  }
}

Package.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

const enhance = pipe(
  DragSource(DTypes.PACKAGE, source, sourceCollect),
  DropTarget(
    [DTypes.OPTION, DTypes.PRODUCT, DTypes.SIDELIST_ITEM],
    target,
    targetCollect
  )
);

export default enhance(Package);
