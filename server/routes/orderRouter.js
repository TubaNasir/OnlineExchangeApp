const router = require("express").Router();
const orderController = require("../controller/orderController")
const authorization = require('../middleware/authorization')

router.post('/place_order', authorization, orderController.placeOrder)

router.get('/order_info/:id?', authorization, orderController.getOrderInfo)

router.get('/all_orders', authorization, orderController.getAllOrders)

router.put('/update_order/:id?', authorization, orderController.updateOrder)

module.exports = router