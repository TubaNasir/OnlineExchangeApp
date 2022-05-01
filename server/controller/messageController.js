const router = require("express").Router()
const Message = require("../model/messageModel")

const messageController = {
    newMessage: async (req,res) => {
        const newMessage = new Message(req.body)  //saves the body inside the variable

    try{
      const savedMessage = await newMessage.save()
      if (!savedMessaage) return res.status(404).json({ error: { code: res.statusCode, msg: 'Message has not been added to the DB' }, data: null })
      res.status(200).json({error:{code: null, msg: null}, data: "Message has been sent"}) 
    }catch(err){
        return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
    }
    },

    getMessage: async (req,res) => {
        try{
       
            const messages = await Message.find({
             conversationId : req.params.conversationId
     
            })
            res.status(200).json({error:{code: null, msg: null}, data: messages}) 
     
         }catch(err){
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
         }
    } 
}

module.exports = messageController;