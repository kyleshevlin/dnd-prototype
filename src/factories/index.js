import shortid from 'shortid';
import faker from 'faker';
import { DTypes } from '../constants';

export const productFactory = () => ({
  id: shortid.generate(),
  name: faker.commerce.productName(),
  type: DTypes.PRODUCT
});

export const optionFactory = () => ({
  id: shortid.generate(),
  name: faker.commerce.productAdjective(),
  type: DTypes.OPTION
});

const itemsGenerator = () =>
  Array(Math.ceil(Math.random() * 6))
    .fill()
    .map(() => (Math.random() > 0.5 ? productFactory() : optionFactory()));

export const packageFactory = () => ({
  id: shortid.generate(),
  items: itemsGenerator(),
  name: faker.commerce.productName(),
  type: DTypes.PACKAGE
});
