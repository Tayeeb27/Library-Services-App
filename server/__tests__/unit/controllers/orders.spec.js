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
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })



})
