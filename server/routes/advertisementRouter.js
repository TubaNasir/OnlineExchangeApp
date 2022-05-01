const router = require('express').Router()
const advertisementController = require('../controller/advertisementController')
const imageController = require('../controller/imageController')
const authorization = require('../middleware/authorization')

router.get('/ad_info/:id?', advertisementController.getAdInfo)
router.get('/all_ads/:slug?', advertisementController.getAllAds)
router.get('/count_ads/:slug?', advertisementController.countAds)
router.post('/post_ad', authorization, advertisementController.postAd)
router.post('/upload_image', authorization, imageController.imageUpload)
router.put('/update_ad/:id?', authorization, advertisementController.updateAd)

module.exports = router