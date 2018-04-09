import shortid from 'shortid';
import faker from 'faker';

export const productFactory = () => ({
  id: shortid.generate(),
  name: faker.commerce.productName(),
  type: 'product'
});

export const optionFactory = () => ({
  id: shortid.generate(),
  name: faker.commerce.productAdjective(),
  type: 'option'
});

const itemsGenerator = () =>
  Array(Math.ceil(Math.random() * 6))
    .fill()
    .map(() => (Math.random() > 0.5 ? productFactory() : optionFactory()));

export const packageFactory = () => ({
  id: shortid.generate(),
  items: itemsGenerator(),
  name: faker.commerce.productName(),
  type: 'package'
});
