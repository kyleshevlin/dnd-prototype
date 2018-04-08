import React, { Component } from 'react'
import PackageContainer from './PackageContainer'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items
    }

    this.moveItem = this.moveItem.bind(this)
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
      <div style={{ width: '50%' }}>
        <h1>List</h1>
        {this.state.items.map((pkg, index) => (
          <PackageContainer
            key={pkg.name}
            index={index}
            moveItemInList={this.moveItem}
            {...pkg}
          />
        ))}
      </div>
    )
  }
}

export default List
