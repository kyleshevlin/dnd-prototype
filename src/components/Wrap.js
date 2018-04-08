import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Wrap extends Component {
  render() {
    return (
      <div style={{ display: 'flex', padding: '1em' }}>
        {this.props.children}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Wrap)
