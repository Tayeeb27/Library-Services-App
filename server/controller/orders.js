const Orders = require('../models/Orders')

const index = async (req, res) => {
    try {
        const orders = await Orders.getAll()
        res.status(200).json(orders)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const show = async (req, res) => {
    try{
        const order = req.params.id
        const newOrder = await Orders.getById(order)
        res.status(200).json(newOrder)

    }catch(error){
      res.status(404).json({error: error.message})
    }
}

const  createOrder = async (req, res) => {
    try{
        const data = req.body;
        const newOrder = await Orders.createOrder(data);
        res.status(201).json(newOrder);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const updateOrder = async (req, res) => {
    try{
        const {user_id, book_id, collection_date, order_reference, order_id} = req.body
        const updatedOrder = await Orders.updateOrder(user_id, book_id, collection_date, order_reference, order_id)
        res.status(200).json(updatedOrder)

    }catch(error){
      res.status(404).json({error: error.message})
    }
}


module.exports = {index, show, createOrder, updateOrder}