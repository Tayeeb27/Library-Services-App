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
        const newUser = await Orders.getById(user)
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
    const data = req.body;
    const updatedUser = await Users.updateUser(data)
    res.status(201).json(updatedUser)
} catch (error) {
    res.status(404).json({error: error.message})
}

}

const destroy = async (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await Users.showId(id)
        const deleteUser = await user.destroy(user)
        res.status(200).end()
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {index, showId, createUser, updateUser, destroy}