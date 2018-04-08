import React, { Component } from 'react'
import OtherListItem from './OtherListItem'

class OtherList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item => (
            <OtherListItem key={item.id} {...item} />
          ))}
        </ul>
      </div>
    )
  }
}

export default OtherList
