const Complaint = require('../model/complaintModel')
const User = require('../model/userModel')
const Ad = require('../model/advertisementModel')

class features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        console.log(queryObj)
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(e => delete (queryObj[e]))
        console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        console.log(queryStr)
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            console.log('sortBy:', sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const complaintController = {
    getComplaintInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password")
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No User Found' }, data: null })

            if (user.role === 2) { //if user 
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }
            if (!req.params.id) // if no id, return error
                return res.status(404).json({ error: { code: res.statusCode, msg: 'Complaint ID missing' }, data: null })

            //if id, return complaint info
            const complaint = await Complaint.findById(req.params.id)
            console.log(complaint)
            if (!complaint) return res.status(404).json({ error: { code: res.statusCode, msg: 'No Complaint Found' }, data: null })
            return res.status(200).json({ error: { code: null, msg: null }, data: complaint })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
        }

    },

    getAllComplaints: async (req, res) => {

        try {
            const user = await User.findById(req.user.id).select("-password")
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No User Found' }, data: null })

            if (user.role === 2) {//user
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }

            const result = new features(Complaint.find(), req.query).filtering().sorting().paginating()

            const all_complaints = await result.query
            if (!all_complaints) return res.status(404).json({ error: { code: res.statusCode, msg: 'No complaints found' }, data: null })

            return res.status(200).json({ error: { code: null, msg: null }, data: all_complaints })


        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
        }

    },
    addComplaint: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password")
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No User Found' }, data: null })

            if (user.role === 1) {//admin
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }

            const { reported, reportedAgainst, complaint, description } = req.body

            const newComplaint = new Complaint({ reported, reportedAgainst, reportedBy: user._id, complaint, description })
            if (!newComplaint) return res.status(404).json({ error: { code: res.statusCode, msg: 'No complaint recieved' }, data: null })

            const report = await newComplaint.save()

            if (!report) return res.status(404).json({ error: { code: res.statusCode, msg: 'Complaint not updated' }, data: null })

            return res.status(200).json({ error: { code: null, msg: null }, data: report })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
        }
    },

    updateComplaint: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })

            if (user.role === 2) {//user
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }

            if (!req.params.id) { // if no id, error
                return res.status(400).json({ error: { code: res.statusCode, msg: 'Complaint ID missing' }, data: null })
            }

            const complaint = await Complaint.findById(req.params.id)
            if (!complaint) return res.status(404).json({ error: { code: res.statusCode, msg: 'No Complaint Found' }, data: null })

            const statusR = '';
            console.log(complaint)
            if (complaint.reported === 0) {
                console.log('sss')
                console.log(ObjectID(complaint.reportedAgainst))
               statusR = await Ad.find({_id: ObjectID(complaint.reportedAgainst)},{status:1})
            }
            else {
                statusR = await User.find(new ObjectId(complaint.reportedAgainst)).select('status')
            }

            if (!statusR) return res.status(404).json({ error: { code: res.statusCode, msg: 'Unable to find status of reported item' }, data: null })

            console.log(statusR)
            if (statusR === 'deleted') return res.status(403).json({ error: { code: res.statusCode, msg: 'Ad/Product has been deleted' }, data: null })


            const status = req.body;
            const updatedComplaint = await Complaint.findOneAndUpdate({ _id: req.params.id }, status, { new: true })
            if (!updatedComplaint) return res.status(404).json({ error: { code: res.statusCode, msg: 'Complaint not updated' }, data: null })

            return res.status(200).json({ error: { code: null, msg: null }, data: updatedComplaint })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    },


}

module.exports = complaintController