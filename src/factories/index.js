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
    .map(() => {
      const randomNumber = Math.random();

      return randomNumber > 0.9
        ? packageFactory()
        : randomNumber > 0.4 ? productFactory() : optionFactory();
    });

export const packageFactory = () => ({
  id: shortid.generate(),
  items: itemsGenerator(),
  name: faker.commerce.productName(),
  type: 'package'
});
