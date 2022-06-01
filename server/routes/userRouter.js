const router = require('express').Router()
const userController = require('../controller/userController')
const authorization = require('../middleware/authorization')
const upload = require("../utils/multer");


router.post('/register', upload.fields([{name:'file1'}]),userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/user_info/:id?', authorization, userController.getUserInfo) 

router.get('/all_users', userController.getAllUsers) 

router.get('/refresh_token', userController.refreshToken)

router.patch('/add_to_cart', authorization, userController.addToCart)

router.patch('/update_user_info/:id?', authorization, userController.updateUserInfo)

//router.delete('/delete', authorization, userController.deleteUser)






module.exports = router