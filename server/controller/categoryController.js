const Category = require("../model/categoryModel");
const slugify = require("slugify");
const User = require("../model/userModel");
const cloudinary = require('../utils/cloudinary')
const fs = require ('fs')

function createCategory(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            //image: (cate.image.url) ? cate.image.url:null,
            children: createCategory(categories, cate._id),
        });
    }
    return categoryList;
}

const categoryController = {
    //create category
    createCat: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No User Found" },
                    data: null,
                });

            

            if (req.user.role === 2) {
                return res.status(403).json({
                    error: { code: res.statusCode, msg: "access denied" },
                    data: null,
                });
            } else {
                 const name= req.body.name
             
                
                if (Object.keys(name).length === 0) {
                    return res.status(404).json({ error: { code: res.statusCode, msg: 'Input data missing' }, data: null })
    
                 }

                const categoryObj = new Category({
                    name: req.body.name,
                    slug: slugify(req.body.name)
                });
    
                if (req.body.parentId) {
                    categoryObj.parentId = req.body.parentId;
                }

                const savedCat = await categoryObj.save();
                if (!savedCat)
                    return res.status(404).json({
                        error: { code: res.statusCode, msg: "Category not added" },
                        data: null,
                    });
                res.status(200).json({
                    error: { code: res.statusCode, msg: null },
                    data: "Category has been added",
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: { code: res.statusCode, msg: res.statusMessage },
                data: null,
            });
        }
    },

    category_info: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No User Found" },
                    data: null,
                });

            if (user.role == 2) {
                return res.status(400).json({
                    error: { code: res.statusCode, msg: "Access Denied" },
                    data: null,
                })
            }

            

            const cat = await Category.findOne({slug:req.body.slug});
            if (!cat)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No Category found" },
                    data: null,
                });
            return res
                .status(200)
                .json({ error: { code: null, msg: null }, data: cat });
        } catch (err) {
            return res.status(500).json({
                error: { code: res.statusCode, msg: res.statusMessage },
                data: null,
            });
        }
    },

    //get all categories
    all_categories: async (req, res) => {
        try {

            const category = await Category.find({});
            const categoryList = createCategory(category);

            if (!categoryList)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No Category Found" },
                    data: null,
                });

            return res.status(200).json({ error: { code: res.statusCode, msg: null }, data: categoryList });
        } catch (err) {
            return res.status(500).json({error: { code: res.statusCode, msg: res.statusMessage },data: null,
            });
        }
    },

    update: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No User Found" },
                    data: null,
                });

            if (user.role === 2) {
                return res.status(400).json({
                    error: { code: res.statusCode, msg: "Access Denied" },
                    data: null,
                });
            } else {

                const {value, name, parentId} = req.body
                const savedCat = await Category.findOneAndUpdate(
                    { _id: value},
                    { name, parentId},
                    { new: true }
                );
                if (!savedCat)
                    return res.status(404).json({
                        error: { code: res.statusCode, msg: "Category not updated" },
                        data: null,
                    });

                res.status(200).json({
                    error: { code: res.statusCode, msg: null },
                    data: "Updated successfully",
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: { code: res.statusCode, msg: res.statusMessage },
                data: null,
            });
        }
    },

    delete: async(req, res) =>{
        try {

            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({
                    error: { code: res.statusCode, msg: "No User Found" },
                    data: null,
                });

            if (user.role === 2) {
                return res.status(400).json({
                    error: { code: res.statusCode, msg: "Access Denied" },
                    data: null,
                });
            } 
            /* const product = await Product.findOne({brand: req.params.id})
            if(product) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            }) */ 
            const {value, name, parentId} = req.body

            if (Object.keys(value).length === 0) {
                return res.status(404).json({ error: { code: res.statusCode, msg: 'Input data missing' }, data: null })

            }
                else{
           
            const savedCat = await Category.findOneAndDelete(
                { _id: value},
                { new: true }
            )

            if (!savedCat)
            return res.status(404).json({
                error: { code: res.statusCode, msg: "Category not deleted" },
                data: null,
            });

        res.status(200).json({
            error: { code: res.statusCode, msg: null },
            data: "Deleted successfully",
        })};

        } catch (err) {
            return res.status(500).json({
                error: { code: res.statusCode, msg: res.statusMessage },
                data: null,
            });
        }
    }

}

module.exports = categoryController;

const removeTmp = (path) =>{
    console.log('error')
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}