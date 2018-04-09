import React, { Component } from 'react'
// import PackageContainer from './PackageContainer'
import Package from './Package'
import Product from './Product'

class List extends Component {
  constructor() {
    super()

    this.getItemComponent = this.getItemComponent.bind(this)
  }

  getItemComponent(item) {
    switch (item.type) {
      case 'product':
        return Product

      case 'option':
        return 'OPTION'

      case 'package':
        return Package

      default:
        return null
    }
  }

  render() {
    return (
      <div style={{ width: '50%' }}>
        <h1>List</h1>
        {this.props.items.map((item, index) => {
          const Comp = this.getItemComponent(item)
          return <Comp key={index} {...item} />
        })}
      </div>
    )
  }
}

export default List
