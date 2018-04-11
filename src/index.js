import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wrap from './components/Wrap';
import MainList from './features/MainList';
import OtherList from './features/OtherList';
import { optionFactory, packageFactory, productFactory } from './factories';

const items = Array(4)
  .fill()
  .map(() => (Math.random() > 0.67 ? productFactory() : packageFactory()));

const otherListItems = [optionFactory(), productFactory()];

const App = () => (
  <div>
    <Wrap>
      <MainList items={items} />
      <OtherList items={otherListItems} />
    </Wrap>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
