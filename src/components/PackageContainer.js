import React, { Component } from 'react'
import Package from './Package'

class PackageContainer extends Component {
  constructor(props) {
    super(props)

    this.state = { items: props.items }

    this.addItem = this.addItem.bind(this)
    this.fromThisPackage = this.fromThisPackage.bind(this)
    this.moveItem = this.moveItem.bind(this)
  }

  addItem(item) {
    item.index = this.state.items.length
    this.setState({ items: [...this.state.items, item] })
  }

  fromThisPackage(id) {
    return this.state.items
      .map(item => item.id)
      .includes(id)
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state
    const dragItem = items[dragIndex]
    const hoverItem = items[hoverIndex]

    this.setState({
      items: items.map((item, index) => {
        switch (index) {
          case dragIndex:
            return hoverItem

          case hoverIndex:
            return dragItem

          default:
            return item
        }
      })
    })
  }

  render() {
    return (
      <Package
        addItem={this.addItem}
        fromThisPackage={this.fromThisPackage}
        items={this.state.items}
        moveItemInPackage={this.moveItem}
        name={this.props.name}
      />
    )
  }
}

export default PackageContainer
