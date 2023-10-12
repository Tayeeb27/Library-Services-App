const Users = require('../../../models/Users')
const db = require('../../../database/connect')

describe('Users model', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
//   test to make sure Users is defined
    it('is defined', () => {
      expect(Users).toBeDefined()
    })

    it('resolves all users', async () => {    
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [{            
            "user_id": 2,
            "name": "jane smith",
            "email": "janesmith@example.com",
            "password": "qwerty123",
            "access_lvl": 0         
      
      }],
      });  
    const users = await Users.getAll();
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty('user_id');
  });

  it('should return a user when search by email', async () => {
    const email = 'janesmith@example.com'
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [{      
          user_id: 2,
          name: "jane smith",
          email: "janesmith@example.com",
          password: "qwerty123",
          access_lvl: 0
        }]
      });

      const user = await Users.getOneByEmail(email);
      expect(user).toBeDefined();
      expect(user.user_id).toBe(2);
      expect(user.email).toBe(email);
      expect(user.name).toBe('jane smith');
      });


      it('should delete a user', async () => {
        const user_id = 2
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{      
            user_id: 2,
            name: "jane smith",
            email: "janesmith@example.com",
            password: "qwerty123",
            access_lvl: 0
          }]
        });
        const deletedUser = await Users.destroy(user_id);
        expect(deletedUser).toBeDefined();
        expect(deletedUser.user_id).toBe(2);
        expect(deletedUser.email).toBe('janesmith@example.com');
        expect(deletedUser.name).toBe('jane smith');
      });

      it('should update a user', async () => {
        const user_id = 2
        const updateUser = {
          name: "smith smith",
          email: "janesmith@example.com",
          password: "qwety5555",
        }
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{      
            user_id: 2, ...updateUser
          }]
        })
        const updatedUser = await Users.updateUser(user_id, updateUser);
        expect(updatedUser).toBeDefined();
        expect(updatedUser.user_id).toBe(2);
        expect(updatedUser.email).toBe(updateUser.email);
        expect(updatedUser.name).toBe(updateUser.name);
        expect(updatedUser.password).toBe(updateUser.password);
      });
            
      it('should register a new user', async () => {
        const newUser = {
          user_id: 9,
          name: "june smyth",
          email: "jsmyth@example.com",
          password: "qwer789",
          access_lvl: 0
        }
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{      
            user_id: 9, ...newUser
          }]
        })
        const registeredUser = await Users.register(newUser);
        expect(registeredUser).toBeDefined();
        expect(registeredUser.user_id).toBe(9);
        expect(registeredUser.email).toBe(newUser.email);
        expect(registeredUser.name).toBe(newUser.name);
        expect(registeredUser.password).toBe(newUser.password);        
      })

it('should return a user when search by id', async () => {
  const user_id = 3
    jest.spyOn(db, 'query').mockResolvedValueOnce({
      rows: [{   
          "user_id": 3,
          "name": "william allen",
          "email": "william123@example.com",
          "password": "pass1234",
          "access_lvl": 0
      }]
    });
    const user = await Users.getById(user_id);
    expect(user).toBeDefined();
    expect(user.user_id).toBe(3);
    expect(user.email).toBe('william123@example.com');
    expect(user.name).toBe('william allen');   

})

it('should throw an error when no user is found', async () => {
  // Define a sample user ID for the test
  const nonExistentUserId = 456;
  // Mock the db.query function to return an empty response (no matching rows)
  jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
  // Use async/await with try-catch to catch the error
  try {
    await Users.getById(nonExistentUserId);
    // If no error is thrown, fail the test
    fail('Expected an error to be thrown');
  } catch (error) {
    // Assert that the error message matches your expectation
    expect(error.message).toBe('No User Found');
  }
});


});