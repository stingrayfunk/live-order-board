# Live Order Board

This API provides several JavaScript functions to manage Silver Bar™ orders.

## Installation

(mock package as an example)

    npm install @silver-bars/live-order-board --save

## Usage

```javascript
import {
  registerOrder,
  cancelOrder,
  getLiveOrderBoard,
  getOrders,
  OrderTypes,
} from '@silver-bars/live-order-board';

registerOrder({
  type: OrderTypes.BUY,
  quantity: 2.0,
  price: 70,
  userId: '7',
});

getLiveOrderBoard(); // Returns ['BUY: 2kg for £70.00']

const orders = getOrders();

const { id } = orders[0];

cancelOrder(id);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Getting started

(developer info for contributing to the package)

### Tests

    npm run test

Watch mode:

    npm run test:watch

## License
[MIT](https://choosealicense.com/licenses/mit/)