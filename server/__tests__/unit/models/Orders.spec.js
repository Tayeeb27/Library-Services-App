const Orders = require('../../../models/Orders')
const db = require('../../../database/connect')

describe('Orders model', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
//   test to make sure Orders is defined
    it('is defined', () => {
      expect(Orders).toBeDefined()
    })
// test to get all orders
    it('resolves with all orders', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{  
            order_id: 1,
            user_id: 1,
            book_id: 4,
            collection_date: "2023-09-04T23:00:00.000Z",
            order_reference: "1234"
        
        }],
        });
        const orders = await Orders.getAll();
        expect(orders).toHaveLength(1);
        expect(orders[0]).toHaveProperty('order_id');
      });
    
// get order by id
      it('should return a single order when found', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{ order_id: 1, user_id: 1, book_id: 4, collection_date: 20230904, order_reference: 1234 }],
        });
    
        const order = await Orders.getById(123);
        expect(order).toBeDefined();
        expect(order.order_id).toBe(1);
        expect(order.user_id).toBe(1);
        expect(order.order_reference).toBe(1234);
      });
    
      it('should return an array of orders when multiple orders are found', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [
            { order_id: 1, user_id: 123, total: 50 },
            { order_id: 2, user_id: 123, total: 75 },
          ],
        });
    
        const orders = await Orders.getById(123);
        expect(orders).toBeDefined();
        expect(orders).toBeInstanceOf(Array);
        expect(orders.length).toBe(2);
        expect(orders[0].order_id).toBe(1);
        expect(orders[1].order_id).toBe(2);
      });
    
      it('should throw an error when no orders are found', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
        try {
          await Orders.getById(456); // Assuming user_id 456 has no orders
          // If no error is thrown, fail the test
          fail('Expected an error to be thrown');
        } catch (error) {
          // Assert that the error message matches your expectation
          expect(error.message).toBe('No Orders Found');
        }
      });

 // test to create an order
    it('should create and return a new order', async () => {
        const sampleData = {
          user_id: 123,
          book_id: 456,
          collection_date: '2023-10-12',
          order_reference: 'ORDER123'
        };
        
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [sampleData],
        });
    
        const newOrder = await Orders.createOrder(sampleData);
    
        expect(newOrder).toBeDefined();
        expect(newOrder.user_id).toBe(sampleData.user_id);
        expect(newOrder.book_id).toBe(sampleData.book_id);
        expect(newOrder.collection_date).toBe(sampleData.collection_date);
        expect(newOrder.order_reference).toBe(sampleData.order_reference);
      });

// test to update order
it('should update and return the updated order', async () => {
  const updatedData = {
    user_id: 123,
    book_id: 456,
    collection_date: '2023-10-12',
    order_reference: 'ORDER123',
    order_id: 789,
  };
  
  jest.spyOn(db, 'query').mockResolvedValueOnce({
    rows: [updatedData],
  });

  const updatedOrder = await Orders.updateOrder(
    updatedData.user_id,
    updatedData.book_id,
    updatedData.collection_date,
    updatedData.order_reference,
    updatedData.order_id
  );

  expect(updatedOrder).toBeDefined();
  expect(updatedOrder.user_id).toBe(updatedData.user_id);
  expect(updatedOrder.book_id).toBe(updatedData.book_id);
  expect(updatedOrder.collection_date).toBe(updatedData.collection_date);
  expect(updatedOrder.order_reference).toBe(updatedData.order_reference);
  expect(updatedOrder.order_id).toBe(updatedData.order_id);
});
    

});