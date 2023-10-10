const bcrypt = require('bcrypt');
const Users = require('../models/Users')
const Token = require('../models/Tokens')


const index = async (req, res) => {
    try {
        const users = await Users.getAll()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const showId = async (req, res) => {
    try{
        const user = req.params.id
        const newUser = await Users.getById(user)
        res.status(200).json(newUser)

    }catch(error){
      res.status(404).json({error: error.message})
    }
}
const  createUser = async (req, res) => {
    try{
        const data = req.body;
        const newUser = await Users.createUser(data);
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const updateUser = async (req, res) => {
    try {
      const id = req.params.id; // Assuming you're extracting the user ID from the request parameters
      const data = req.body;
      const updatedUser = await Users.updateUser(id, data); // Pass the user ID as the first argument
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  

  const destroy = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await Users.destroy(id);
  
      if (!user) {
        // Handle the case where the user with the given ID doesn't exist
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Call the destroy method on the user object to delete it
      await user.destroy();
  
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  //FUNCTIONS FOR TOKEN

  async function register (req, res){
    try {
      const data = req.body;

      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

      // Hash the password
      data["password"] = await bcrypt.hash(data["password"], salt);

      const result = await Users.register(data);

      res.status(201).send(result);
  } catch (err) {
      res.status(400).json({"error": err.message})
  }}

  async function login (req, res) {
    const data = req.body;
    try {
        const user = await Users.getOneByEmail(data.email);
        console.log("User", user)
        const authenticated = await bcrypt.compare(data.password, user["password"]);
        console.log("Authenticated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.user_id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
  }

module.exports = {index, showId, createUser, updateUser, destroy, register, login}