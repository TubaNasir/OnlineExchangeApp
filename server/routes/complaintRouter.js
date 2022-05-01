const router = require('express').Router()
const complaintController = require('../controller/complaintController')
const authorization = require('../middleware/authorization')

router.get('/complaint_info/:id?',authorization,complaintController.getComplaintInfo)
router.get('/all_complaints',authorization, complaintController.getAllComplaints)
router.post('/add_complaint',authorization,complaintController.addComplaint)
router.put('/update_complaint/:id?',authorization,complaintController.updateComplaint)

module.exports = router