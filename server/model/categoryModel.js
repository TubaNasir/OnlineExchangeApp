const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    
    {
        name: {type:String, required:true, trim:true},
        slug: {type:String, required:true, trim:true},
        parentId: {type:String},
        image:{
        type: Object
    },
        status: {type: String, 
            enum:['enabled', 'disabled'],
            default: "enabled"},
    },
    {timestamps: true}
    )

module.exports = mongoose.model("category",categorySchema, "category")