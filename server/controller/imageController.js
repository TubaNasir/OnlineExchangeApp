const User = require('../model/userModel')

const cloudinary = require('cloudinary')
const fs = require('fs')


const imageController = {

    imageUpload: async (req, res) => {
        try {

            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })


            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(404).json({ error: { code: res.statusCode, msg: 'File missing' }, data: null })


            var images = [];

            var files = [];
            var fileKeys = Object.keys(req.files);

            fileKeys.forEach(function (key) {
                files.push(req.files[key]);
            });


            //const files = req.files;
            const promises = files.map((file) => new Promise((resolve, reject) => {
                console.log(file)
                if (file.size > 1024 * 1024) {
                    removeTmp(file.tempFilePath)
                    return res.status(404).json({ error: { code: res.statusCode, msg: 'File size is too large' }, data: null })
                }

                if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
                    removeTmp(file.tempFilePath)
                    return res.status(404).json({ error: { code: res.statusCode, msg: 'File format is incorrect' }, data: null })
                }

                cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "Online-Exchange-App" }, async (err, result) => {
                    if (err) reject(res.status(404).json({ error: { code: res.statusCode, msg: error.msg }, data: null }))

                    removeTmp(file.tempFilePath)
                    resolve(images.push({ url: result.url, public_id: result.public_id }))
                    //console.log(images)
                })
            }))

            await Promise.all(promises)
            console.log(images)
            return res.status(200).json({ error: { code: null, msg: null }, data: images })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: "error" }, data: null })

        }
    },

}


 const removeTmp = (path) =>{
    console.log('error')
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = imageController; 