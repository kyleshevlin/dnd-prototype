import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wrap from './components/Wrap';
import MainList from './features/MainList';
import OtherList from './features/OtherList';
import { optionFactory, packageFactory, productFactory } from './factories';

const items = Array(Math.ceil(Math.random() * 6))
  .fill()
  .map(() => {
    const randomNumber = Math.random();

    return randomNumber > 0.67
      ? packageFactory()
      : randomNumber > 0.33 ? productFactory() : optionFactory();
  });

const otherListItems = [optionFactory(), packageFactory(), productFactory()];

const App = () => (
  <div>
    <Wrap>
      <MainList items={items} />
      <OtherList items={otherListItems} />
    </Wrap>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
