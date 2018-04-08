import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { DTypes } from '../constants'
import Product from './Product'

const packageTarget = {
  hover(props, monitor, component) {
    const monitorItem = monitor.getItem()
    const dragIndex = monitorItem.index
    const hoverIndex = props.index

    // Don't replace item with itself
    if (dragIndex === hoverIndex) {
      return
    }

    // Get rectangle on screen
    const hoverRect = findDOMNode(
      component
    ).getBoundingClientRect()

    // Get vertical middle
    const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2

    // Get mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverRect.top

    // Only perform the move when the mouse has crossed half of the item's height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Downwards
    if (
      dragIndex < hoverIndex &&
      hoverClientY < hoverMidY
    ) {
      return
    }

    // Upwards
    if (
      dragIndex > hoverIndex &&
      hoverClientY > hoverMidY
    ) {
      return
    }

    // We good to go from here
    props.moveItemInList(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitorItem.index = hoverIndex
  }
}

const packageTargetCollect = connect => ({
  packageConnectDropTarget: connect.dropTarget()
})

const packageSource = {
  beginDrag(props) {
    return Object.assign({}, props)
  }
}

const packageSourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const productTarget = {
  drop(props, monitor) {
    const { addItem, fromThisPackage } = props
    const item = monitor.getItem()

    if (!fromThisPackage(item.id)) {
      addItem(item)
    }
  }
}

const productTargetCollect = connect => ({
  productConnectDropTarget: connect.dropTarget()
})

class Package extends Component {
  render() {
    const {
      connectDragSource,
      fromThisPackage,
      index: parentIndex,
      isDragging,
      moveItemInPackage,
      name,
      packageConnectDropTarget,
      productConnectDropTarget
    } = this.props

    return productConnectDropTarget(
      packageConnectDropTarget(
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
            {this.props.items.map((item, index) => (
              <Product
                fromThisPackage={fromThisPackage}
                index={index}
                key={item.id}
                moveItemInPackage={moveItemInPackage}
                parentIndex={parentIndex}
                {...item}
              />
            ))}
          </div>
        )
      )
    )
  }
}

export default DropTarget(
  DTypes.PRODUCT,
  productTarget,
  productTargetCollect
)(
  DropTarget(
    DTypes.PACKAGE,
    packageTarget,
    packageTargetCollect
  )(
    DragSource(
      DTypes.PACKAGE,
      packageSource,
      packageSourceCollect
    )(Package)
  )
)
