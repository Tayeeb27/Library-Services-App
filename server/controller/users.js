const Users = require('../models/Users')


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
  

module.exports = {index, showId, createUser, updateUser, destroy}