import React, { Component } from 'react'
import List from './List'

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items
    }

    this.addItem = this.addItem.bind(this)
  }

  addItem(item) {
    this.setState({
      items: [...this.state.items, item]
    })
  }

  render() {
    return (
      <List
        addItem={this.addItem}
        items={this.state.items}
      />
    )
  }
}

Container.defaultProps = {
  items: []
}
