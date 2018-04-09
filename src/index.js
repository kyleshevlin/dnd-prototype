import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Wrap from './components/Wrap'
import Container from './components/Container'
import List from './components/List'
import OtherList from './components/OtherList'

const package1 = {
  name: 'Package 1',
  type: 'package',
  items: [
    { id: 1, name: 'Product 1', type: 'product' },
    { id: 2, name: 'Product 2', type: 'product' },
    { id: 3, name: 'Product 3', type: 'product' },
    { id: 4, name: 'Product 4', type: 'product' }
  ]
}

const package2 = {
  name: 'Package 2',
  type: 'package',
  items: [
    { id: 5, name: 'Option 1', type: 'option' },
    { id: 6, name: 'Option 2', type: 'option' },
    { id: 7, name: 'Option 3', type: 'option' }
  ]
}

const otherListItems = [
  { id: 8, name: 'Product', type: 'product' },
  { id: 9, name: 'Option', type: 'option' },
  { id: 10, name: 'Package', type: 'package' }
]

const App = () => (
  <div>
    <Wrap>
      <Container items={[]} />
      <OtherList items={otherListItems} />
    </Wrap>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
