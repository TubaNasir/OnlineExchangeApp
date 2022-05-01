const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    reported: {// 0 ad, 1 user
        type: Number,
        required: true,
    },
    reportedAgainst: {
        type: String,
        required: true,
    },
    reportedBy: {
      type: String,
      required: true,
    },
    complaint: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('complaint', complaintSchema, 'complaint')