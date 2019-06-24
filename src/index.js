/**
 * Live Board API methods.
 *
 * As this grows, these methods should be moved out to their own modules.
 */

import Joi from '@hapi/joi';
import uuid from 'uuid/v4';

export const OrderTypes = {
  BUY: 'BUY',
  SELL: 'SELL',
};

// The validation could also be written as simply bespoke functions, 
// e.g. isCurrency(), isUuid(), isFloat()
const Schema = {
  type: Joi.string().valid(OrderTypes.BUY, OrderTypes.SELL),
  quantity: Joi.number(), // this could be more specific, i.e. a floating point number
  price: Joi.number(), // this could be specified as currency format
  userId: Joi.string(), // this could be validated as a UUID
  id: Joi.string(), // this could be validated as a UUID
};

const orders = [];

/**
 * Validate properties and create order
 */
export function registerOrder({ type, quantity, price, userId }) {
  Joi.validate(type);
  Joi.validate(quantity);
  Joi.validate(price);
  Joi.validate(userId);
  
  orders.push({
    id: uuid(),
    type,
    quantity,
    price,
    userId, 
  });
}

/**
 * Get the array of orders
 */
export function getOrders() {
  return orders;
}

/**
 * Cancel an order, removing it from the array
 */
export function cancelOrder(orderId) {
  const i = orders.findIndex((order) => order.id === orderId);

  orders.splice(i, 1);
}

/**
 * Callback for sorting orders by type and price
 */
function sortByTypeAndPrice(a, b) {
  if (a.type > b.type) {
    return 1;
  }
  else if (a.type === b.type) {
    // Sort buy orders by highest price first
    if (a.type === 'BUY') {
      return a.price < b.price ? 1: -1;
    }
    // Sort sell orders by lowest price first
    if (a.type === 'SELL') {
      return a.price > b.price ? 1: -1;
    }
  }

  return -1;
}
   
/**
 * Returns orders in a format ready for the UI
 */   
export function getLiveOrderBoard() {
  // Sort all orders so that equal price orders sit together
  orders.sort(sortByTypeAndPrice);

  const liveBoard = [];
  
  for (let i = 0; i < orders.length; i++) {
    const cur = orders[i];
    const next = orders[i+1];

    // Establish if types and prices are equal
    const haveEqualPrices = next && cur.type === next.type && cur.price === next.price;

    // If prices are equal, add their quantities, or just use current order quantity
    const quantity = haveEqualPrices ? cur.quantity + next.quantity : cur.quantity;

    // Add entry to the live board
    liveBoard.push(`${cur.type}: ${quantity}kg for £${cur.price.toFixed(2)}`)

    // If both orders had matching prices, skip next order in loop as it's 
    // already included above in live board entry
    if (haveEqualPrices) {
      i++;
    }
  }

  return liveBoard;
}
