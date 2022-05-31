const router = require('express').Router()
const advertisementController = require('../controller/advertisementController')
const imageController = require('../controller/imageController')
const authorization = require('../middleware/authorization')
const upload = require("../utils/multer");

router.get('/ad_info/:id?', advertisementController.getAdInfo)
router.get('/all_advertisements', advertisementController.getAllAdsWithoutFiltersorPagination)
router.get('/all_ads/:slug?', advertisementController.getAllAds)
router.get('/count_ads/:slug?', advertisementController.countAds)
router.post('/post_ad',authorization, upload.fields([{name:'file1'}, {name: 'file2'}]),advertisementController.postAd)
router.patch('/update_ad/:id?', authorization, advertisementController.updateAd)

module.exports = router