import Option from '../features/MainList/Option';
import Package from '../features/MainList/Package';
import Product from '../features/MainList/Product';

export const getItemComponent = item => {
  switch (item.type) {
    case 'option':
      return Option;

    case 'package':
      return Package;

    case 'product':
      return Product;

    default:
      return null;
  }
};
