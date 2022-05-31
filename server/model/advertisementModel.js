const mongoose = require('mongoose')
//new

const advertisementSchema = new mongoose.Schema({
    userId: {
        type: Object
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: Object,
        required: true
    },
    categoryID:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'active',
        enum: ['active', 'toBeApproved','banned', 'unactive','sold']
    },
    area:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    province:{
        type: String,
        required: true
    },
}, {
    timestamps: true 
})


module.exports = mongoose.model('advertisement', advertisementSchema, 'advertisement')