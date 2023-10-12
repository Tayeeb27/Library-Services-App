const Users = require('../../../models/Users')
const db = require('../../../database/connect')

describe('Users model', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
//   test to make sure Users is defined
    it('is defined', () => {
      expect(Users).toBeDefined()
    })

});