import { registerOrder, getOrders, cancelOrder, getLiveOrderBoard, OrderTypes } from '.';

describe('Live order board', () => {
	const testOrders = [
	  {
	    type: OrderTypes.BUY,
	    quantity: 3.5,
	    price: 100.50,
	    userId: '1',
	  },
	  {
	    type: OrderTypes.SELL,
	    quantity: 5.5,
	    price: 50.00,
	    userId: '2',
	  },
	  {
	    type: OrderTypes.BUY,
	    quantity: 2.0,
	    price: 100.50,
	    userId: '3',
	  },
	  {
	    type: OrderTypes.SELL,
	    quantity: 1.5,
	    price: 50.00,
	    userId: '4',
	  },
	  {
	    type: OrderTypes.BUY,
	    quantity: 0.5,
	    price: 20.00,
	    userId: '5',
	  },
	  {
	    type: OrderTypes.SELL,
	    quantity: 2.0,
	    price: 20.00,
	    userId: '6',
	  },
	  {
	    type: OrderTypes.SELL,
	    quantity: 2.0,
	    price: 70.00,
	    userId: '7',
	  },
	];

	beforeAll(() => {
		testOrders.forEach(registerOrder);
	});

	test('should have correct orders on live board', () => {
		expect(getLiveOrderBoard()).toEqual([
			'BUY: 5.5kg for £100.50',
      'BUY: 0.5kg for £20.00',
      'SELL: 2kg for £20.00',
      'SELL: 7kg for £50.00',
      'SELL: 2kg for £70.00',
		]);
	});

	test('should remove a cancelled order', () => {
		let orders = getOrders();
		const { id } = orders[0];

		cancelOrder(id);

		expect(orders.findIndex((order) => order.id === id)).toEqual(-1);
	});

	// I didn't have time, but further testing of the registerOrder() method could be written.
	// Either Joi.validate could be mocked and checked to be called with correct parameters each time
	// (that way, Joi is not being tested, only that we're calling it correctly).
	// Or we could assert that exceptions are thrown for each validation error, though we're testing Joi itself here.
});