const usersController = require('../../../controller/users')
const Users = require('../../../models/Users')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(usersController).toBeDefined()
})

// tests all users route
it('should return users with a status code 200', async () => {
    const testUsers = ['b1', 'b2']
    jest.spyOn(Users, 'getAll')
    .mockResolvedValue(testUsers)
})

// test for failure
it('sends an error upon fail', async () => {
    jest.spyOn(Users, 'getAll')
      .mockRejectedValue(new Error('Something happened to your db'))
      await usersController.index(null, mockRes)
      expect(Users.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })

    // test user with specific id
it("it returns a user with a user id and 200 status code", async () => {
    let testUser = {
            user_id: 1,
            name: "john DD",
            email: "johndoe@example.com",
            password: "$2b$10$aZsy0s96tF3ASWc4fLNa9Ocvxm43zdEY/xOB89JpP9MtMGB19EEtS",
            access_lvl: 0
            };
    jest.spyOn(Users, "getById").mockResolvedValue(new Users(testUser));
    const mockReq = { params: { user_id: 1 } };
    await usersController.showId(mockReq, mockRes);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(new Users(testUser));
    });

    // test new user registration
    test("returns new user data with status 201", async () => {
        const mockUser = {
          name: "Josh",
          email: "email@example.com",
          password: "pass",
        };
  
        jest.spyOn(Users, "register").mockResolvedValue(new Users(mockUser));
  
        const mockReq = {
          body: mockUser,
        };
  
        await usersController.register(mockReq, mockRes);
  
        expect(mockStatus).toHaveBeenCalledWith(201);
      });


// delete user

it('deletes a user with a 204 status code on successful deletion', async () => {
    const userIdToDelete = 2; // Replace with the ID of the user you want to delete
  
    // Mock the Users.destroy method to return null or an empty object (indicating a successful deletion)
    jest.spyOn(Users, 'destroy').mockResolvedValue({}); // You can also use an empty object: {}
  
    const mockReq = {
      params: { user_id: userIdToDelete }, // Assuming the user ID to delete is provided in the request params
    };
  
    await usersController.destroy(mockReq, mockRes);
  
    expect(Users.destroy).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockEnd).toHaveBeenCalledWith();
  });
  
// update user

it('updates a user based on id', async () => {
    const testUser = {
      user_id: 2,
      name: 'jane smith',
      email: 'janesmith@example.com',
      password: 'qwerty123',
      access_lvl: 0
    };
  
    // Mock Users.showId
    jest.spyOn(Users, 'showId')
      .mockResolvedValue(new Users(testUser));
  
    // Mock Users.prototype.updateUser
    jest.spyOn(Users, 'updateUser')
      .mockResolvedValue({ ...new Users(testUser), name: 'Updated Test User' });
  
    // Create mockReq and mockRes
    const mockReq = { params: { id: 2 }, body: testUser };
    const mockStatus = jest.fn();
    const mockSend = jest.fn();
    const mockRes = { status: mockStatus, json: mockSend };
  
    // Call the controller method
    await usersController.updateUser(mockReq, mockRes);
  
    // Assertions
    expect(Users.showId).toHaveBeenCalledTimes(1);
    expect(Users.updateUser).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockSend).toHaveBeenCalledWith({
      data: new Users({
        user_id: 2,
        name: 'Updated Test User', // Updated name
        email: 'test@example.com',
        password: '123',
        access_lvl: 0
      })
    });
  });
  



})