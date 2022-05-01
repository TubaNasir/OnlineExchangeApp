const router = require('express').Router()
const categoryController = require('../controller/categoryController')
const authorization = require('../middleware/authorization')
const imageController = require('../controller/imageController')

router.post("/create", authorization, categoryController.createCat)

router.get("/category_info", authorization, categoryController.category_info)

router.get("/all_categories", categoryController.all_categories)

router.put("/update", authorization, categoryController.update)

router.delete("/delete", authorization, categoryController.delete)

router.post("/upload_image", authorization, imageController.imageUpload)


module.exports = router