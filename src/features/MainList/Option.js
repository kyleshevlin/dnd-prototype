import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { sharedHover } from './sharedDnd';
import { DTypes } from '../../constants';
import { pipe } from '../../utils';

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
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
  hover(props, monitor) {
    sharedHover(props, monitor);
  }
};

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

class Option extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      id,
      isDragging,
      name,
      removeItem
    } = this.props;

    const enhance = pipe(connectDragSource, connectDropTarget);

    return enhance(
      <div
        style={{
          border: '1px solid green',
          cursor: 'move',
          margin: '.75em',
          opacity: isDragging ? 0.5 : 1,
          padding: '1em'
        }}
      >
        Option - {name}
        <button
          onClick={() => {
            removeItem(id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

Option.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

const enhance = pipe(
  DragSource(DTypes.OPTION, source, sourceCollect),
  DropTarget(
    [DTypes.OPTION, DTypes.PACKAGE, DTypes.PRODUCT],
    target,
    targetCollect
  )
);

export default enhance(Option);
