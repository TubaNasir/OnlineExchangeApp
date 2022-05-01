const router = require('express').Router()
const messageController = require('../controller/messageController')
const authorization = require('../middleware/authorization')

router.post("/", authorization, messageController.newMessage)

router.get("/:conversationId?", authorization, messageController.getMessage)

module.exports = router