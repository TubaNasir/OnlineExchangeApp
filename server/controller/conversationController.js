const router = require("express").Router()
const Conversation = require("../model/conversationModel")
const User = require("../model/userModel")

const conversationController = {
    newConv: async (req,res) => {
    
        try{
           const newConversation = new Conversation({
                members: [req.body.senderID, req.body.recieverID], //these 2 IDs will be given in body and added to the members array
                adID: req.body.adID
            });
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({error:{code: res.statusCode, msg: 'No User Found'}, data: null}) 

        const savedConversation = await newConversation.save();
        if (!savedConversation) return res.status(404).json({ error: { code: res.statusCode, msg: 'Conversation not added to DB' }, data: null })
        res.status(200).json({error:{code: null, msg: null}, data: "New Conversation established"}) 
    
        }catch(err){
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
        }
    },

    getConv: async (req,res) => {
        try{
            const conversation = await Conversation.find({
                members: { $in: [req.params.id] },
            });
            res.status(200).json({error:{code: null, msg: null}, data: conversation})
            }
            catch(err){
                return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
            }
    },


}

module.exports = conversationController;