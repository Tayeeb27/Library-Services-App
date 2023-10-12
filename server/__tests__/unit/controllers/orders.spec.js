const ordersController = require("../../../controller/orders")
const Orders = require('../../../models/Orders')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('orders controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(ordersController).toBeDefined()
    });

    it('should return orders with a status code 200', async () => {
        const testOrder = ['b1', 'b2']
        jest.spyOn(Orders, 'getAll')
        .mockResolvedValue(testOrder)
    })

    it('sends an error upon fail', async () => {
        jest.spyOn(Orders, 'getAll')
          .mockRejectedValue(new Error('Something happened to your db'))
          await ordersController.index(null, mockRes)
          expect(Orders.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })

    it('should return an order when searched by id', async () => {
        let testOrder = {        
                order_id: 1,
                user_id: 1,
                book_id: 4,
                collection_date: "2023-09-04",
                order_reference: "1234"             
          };
    jest.spyOn(Orders, "getById").mockResolvedValue(new Orders(testOrder));
    const mockReq = { params: { order_id: 1 } };
    await ordersController.show(mockReq, mockRes);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(new Orders(testOrder));
    });

    it('should return a new order when created new order', async () => {
        let testOrder = {        
                order_id: 1,
                user_id: 1,
                book_id: 4,
                collection_date: "2023-09-04",
                order_reference: "1234"             
          };
    jest.spyOn(Orders, "createOrder").mockResolvedValue(new Orders(testOrder));
    const mockReq = { params: { order_id: 1 } };
    await ordersController.createOrder(mockReq, mockRes);
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(new Orders(testOrder));

    });

    it('updates an order based on id', async () => {
        const testOrder = {            
                order_id: 1,
                user_id: 1,
                book_id: 4,
                collection_date: "2020-09-04",
                order_reference: "5555"
              }   
             
        // Mock Users.prototype.updateUser
        jest.spyOn(Orders, 'updateOrder')
          .mockResolvedValue({ ...new Orders(testOrder), name: 'Updated Test Order' });
      
        // Create mockReq and mockRes
        const mockReq = { params: { order_id: 1 }, body: testOrder };
        const mockStatus = jest.fn();
        const mockSend = jest.fn();    
       
      
        // Call the controller method
        await ordersController.updateOrder(mockReq, mockRes);
      
        // Assertions
        
        expect(Orders.updateOrder).toHaveBeenCalledTimes(1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith({
          data: new Orders({                      
                order_id: 1,
                user_id: 1,
                book_id: 4,
                collection_date: "2020-09-04",
                order_reference: "5555"
             
          })
        });
      });
      


})
