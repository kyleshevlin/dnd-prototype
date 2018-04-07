import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wrap from './components/Wrap';
import List from './components/List';

const package1 = {
  name: 'Package 1',
  items: [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' }
  ]
};

const package2 = {
  name: 'Package 2',
  items: [
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' }
  ]
};

const App = () => (
  <div>
    <Wrap>
      <List items={[package1, package2]} />
    </Wrap>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
