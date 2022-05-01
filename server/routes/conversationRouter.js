const router = require('express').Router()
const conversationController = require('../controller/conversationController')
const  authorization = require('../middleware/authorization')

router.post("/", authorization, conversationController.newConv)

router.get("/:id?", authorization, conversationController.getConv)

module.exports = router