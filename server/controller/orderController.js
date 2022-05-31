const Order = require("../model/orderModel");
const User = require("../model/userModel");

class features {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
        console.log(queryObj)
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(e => delete(queryObj[e]))
       console.log(queryObj)
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

       console.log(queryStr)
       this.query.find(JSON.parse(queryStr))
       return this;
    }   
       sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            console.log('sortBy:', sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

     paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
         
        this.query = this.query.skip(skip).limit(limit)
        return this;
        }  
    }


const orderController = {
    placeOrder: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({error:{code: res.statusCode, msg: 'No User Found'}, data: null})     
 
            if (user.role !== 2) {  //admin
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }
            console.log(req.body)
            const {name, email,contact, sellerID, item, address, city, province} = req.body
            const buyerID = user.id
            console.log(buyerID)
            const newOrder = new Order({name, email, contact, sellerID, buyerID, item, address, city, province});
            if (!newOrder) return res.status(404).json({ error: { code: res.statusCode, msg: 'Order not placed' }, data: null })

            const savedOrder = await newOrder.save();
            if (!savedOrder) return res.status(404).json({ error: { code: res.statusCode, msg: 'Order not added to database' }, data: null })
           
            return res.status(200).json({ error: { code: null, msg: null }, data: "The order has been placed" })
        }
        catch (error){
            return res.status(500).json({error:{code: error.code, msg: error.msg}, data: null})
        }
    },

    getOrderInfo: async (req, res) => {
        try {
            if (!req.params.id) // if no id, return error
            return res.status(404).json({ error: { code: res.statusCode, msg: 'Order ID missing' }, data: null })

            const order = await Order.findById(req.params.id)
            if (!order) return res.status(404).json({error:{code: res.statusCode, msg: 'Invalid Order ID'}, data: null}) 
  
            return res.status(200).json({error:{code: null, msg: null}, data: order})
            
        }
        catch (error) {
            return res.status(500).json({error:{code: err.code, msg: err.msg}, data: null}) 
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const result = new features(Order.find(), req.query).filtering().sorting().paginating()
          
            const all_orders = await result.query
            if (!all_orders) return res.status(404).json({ error: { code: res.statusCode, msg: 'No orders found' }, data: null })

            return res.status(200).json({ error: { code: null, msg: null }, data: all_orders})
        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
        }
    },

    updateOrder: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })

            if (user.role !== 2) { //if user is admin
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }


                if (!req.params.id) { // id is not present   
                    return res.status(400).json({ error: { code: res.statusCode, msg: 'Order ID missing' }, data: null })
                }

                const orderr = await Order.findById(req.params.id)
                if (!orderr) return res.status(404).json({ error: { code: res.statusCode, msg: 'No Order Found' }, data: null })
            
                if (orderr.sellerID !== req.user.id)
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to update this ad' }, data: null })

                const status = req.body;

                const order = await Order.findOneAndUpdate({ _id: req.params.id }, status, { new: true });
                if (!order) return res.status(404).json({ error: { code: res.statusCode, msg: 'Order not updated' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: "Order has been updated" })
            
        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    }
}

module.exports = orderController