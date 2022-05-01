const Ad = require('../model/advertisementModel')
const User = require('../model/userModel')
const Category = require('../model/categoryModel')

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

class features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        //console.log(queryObj)
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(e => delete (queryObj[e]))
        //console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        //console.log(queryStr)
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            //console.log('sortBy:', sortBy)
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

const childrenProducts = async (categoryList, categoryI, rquery, all_ads) => {

    categoryList.map(async (cat) => {
        if (cat.parentId === undefined) {
            if (cat._id.toString() === categoryI._id.toString()) {
                if (cat.children.length > 0) {// go two times inside 
                    cat.children.map(async (cat1) => {
                        if (cat1.children.length > 0) {

                            cat1.children.map(async (child) => {
                                console.log(child.name)
                                const result = new features(Ad.find({ categoryID: child._id.toHexString() }), rquery).filtering().sorting().paginating()
                                const child_ads = await result.query
                                /* Array.prototype.push.apply(all_ads, child_ads);
                                 */
                                //Array.prototype.push.apply(all_ads,child_ads)
                                all_ads = all_ads.concat(child_ads)
                            })
                        }
                    })

                }
            }
        }
    })
    console.log(all_ads)
    return all_ads
}

const advertisementController = {
    countAds: async (req,res) => {
        try{

            if (!req.params.slug) {
                const result = new features(Ad.find(), req.query).filtering()
                const count = await result.query.countDocuments({})
                console.log(count)

                if (!count) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })
                return res.status(200).json({ error: { code: null, msg: null }, data: count })

                
            }
            else {
                const categoryI = await Category.findOne({ slug: req.params.slug })
                if (!categoryI) return res.status(404).json({ error: { code: res.statusCode, msg: 'Category doesnot exist' }, data: null })

                /* const result = new features(Ad.find({ categoryID: categoryI._id.toHexString() }), req.query).filtering().sorting().paginating()
                const all_ads = await result.query
                console.log(all_ads) */

                const category = await Category.find({});
                const categoryList = createCategory(category);
                var all_ads = []
                let ADDS = []
                var ads2 = []
                let promises = null;
                let promise1 = null;
                let promise2 = null; 
                let count = 0;
                if (categoryI.parentId === undefined) {
                promise2 = await categoryList.map(async (cat) => {
                        if (cat._id.toString() === categoryI._id.toString()) {
                            if (cat.children.length > 0) {// go two times inside 
                                promise1 = await cat.children.map(async (cat1) => {
                                    if (cat1.children.length > 0) {
                                        ADDS = cat1.children.map(({ _id }) => ADDS.concat(_id)).flat();

                                        promises = await cat1.children.map(async (child) => {
                                            //console.log(child.name)
                                            const result = new features(Ad.find({ categoryID: child._id.toHexString() }), req.query).filtering()
                                            const child_ads = await result.query.countDocuments({})
                                            /* Array.prototype.push.apply(all_ads, child_ads);
                                             */
                                            console.log(child_ads)
                                            count = count + child_ads

                                            //all_ads= all_ads.concat(child_ads);

                                            return count;
                                        });
                                        
                                        const ads = await Promise.all(promises)
                                        //console.log(ads)
                                        return ads
                                    }
                                    else{return count}

                                });
                                const ads1 = await Promise.all(promise1)
                                //console.log(ads1)
                                return ads1

                            }else{
                                return count
                            }
                        }
                        else{
                            return count
                        }
                    }
                )
                
                ads2= await Promise.all(promise2)
                console.log(ads2)
                console.log(count)
               if (count === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })
                    
                //return ads2
                //console.log(ads2[0][0][0])
                }

                else {console.log('in')
                        const pcat = await Category.findOne({_id : categoryI.parentId});
                        if(pcat.parentId === undefined){
                            console.log(pcat.parentId)
                            promise2 = await categoryList.map(async (cat) => {
                            //console.log(pcat)
                           // console.log(cat._id.toString(), pcat._id.toString())
                            if (cat._id.toString() === pcat._id.toString()) {    
                                promise1 = await cat.children.map(async (cat1) => {
                                     //console.log(cat1._id.toString(),categoryI._id.toString() )
                                     //console.log(cat1.children.length)
                                     if (cat1.children.length > 0) { 
                                        if (cat1._id.toString() === categoryI._id.toString()) {
                                            
                                            if (cat1.children.length > 0) {
                                        promises = await cat1.children.map(async (child) => {
                                            console.log(child.name)
                                            const result = new features(Ad.find({ categoryID: child._id.toHexString() }), req.query).filtering()
                                            const child_ads = await result.query.countDocuments({})
                                            /* Array.prototype.push.apply(all_ads, child_ads);
                                             */
                                            //console.log(child_ads)
                                            count = count + child_ads
                                            //all_ads= all_ads.concat(child_ads);
                                            //console.log(all_ads)
                                            return count;
                                        })}
                                        else{
                                            return count;
                                        };
                                        const ads = await Promise.all(promises)
                                        //console.log(ads)
                                        return ads
                                    }}
                                    else{
                                        return  count
                                    }

                                });const ads1 = await Promise.all(promise1)
                                //console.log(ads1)
                                return ads1
                            }   else {
                                return count
                            } 
                    }
                )
                
                        ads2= await Promise.all(promise2)

                        if (count === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })
                        //console.log(ads2.length)
                                
                        }
                        else{
                            const result = new features(Ad.find({ categoryID: categoryI._id.toHexString() }), req.query).filtering()
                            const child_ads = await result.query.countDocuments({})
                            count = child_ads
                        }
                    }
                
                    //console.log(ads2)
                if (count === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: count })
            }
            return res.status(200).json({ error: { code: null, msg: null }, data: count })
        }
        catch{
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    },

    getAdInfo: async (req, res) => {
        try {
            if (!req.params.id) // if no id, return error
                return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad ID missing' }, data: null })


            const ad = await Ad.findById(req.params.id)
            if (!ad) return res.status(404).json({ error: { code: res.statusCode, msg: 'No Ad found' }, data: null })
            return res.status(200).json({ error: { code: null, msg: null }, data: ad })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    },
    getAllAds: async (req, res) => {
        try {
            //console.log(req.query)
            if (!req.params.slug) {
                //console.log('no slug')
                const result = new features(Ad.find(), req.query).filtering().sorting().paginating()
                const all_ads = await result.query
                if (!all_ads) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: all_ads })
            }
            else {
                const categoryI = await Category.findOne({ slug: req.params.slug })
                if (!categoryI) return res.status(404).json({ error: { code: res.statusCode, msg: 'Category doesnot exist' }, data: null })

                /* const result = new features(Ad.find({ categoryID: categoryI._id.toHexString() }), req.query).filtering().sorting().paginating()
                const all_ads = await result.query
                console.log(all_ads) */

                const category = await Category.find({});
                const categoryList = createCategory(category);
                var all_ads = []
                let ADDS = []
                var ads2 = []
                let promises = null;
                let promise1 = null;
                let promise2 = null; 
                if (categoryI.parentId === undefined) {
                promise2 = await categoryList.map(async (cat) => {
                        if (cat._id.toString() === categoryI._id.toString()) {
                            if (cat.children.length > 0) {// go two times inside 
                                promise1 = await cat.children.map(async (cat1) => {
                                    if (cat1.children.length > 0) {
                                        ADDS = cat1.children.map(({ _id }) => ADDS.concat(_id)).flat();

                                        promises = await cat1.children.map(async (child) => {
                                            //console.log(child.name)
                                            const result = new features(Ad.find({ categoryID: child._id.toHexString() }), req.query).filtering().sorting().paginating()
                                            const child_ads = await result.query
                                            /* Array.prototype.push.apply(all_ads, child_ads);
                                             */
                                            //console.log(child_ads)

                                            Array.prototype.push.apply(all_ads, child_ads)
                                            //all_ads= all_ads.concat(child_ads);

                                            return all_ads;
                                        });
                                        
                                        const ads = await Promise.all(promises)
                                        //console.log(ads)
                                        return ads
                                    }
                                    else{return []}

                                });
                                const ads1 = await Promise.all(promise1)
                                //console.log(ads1)
                                return ads1

                            }else{
                                return []
                            }
                        }
                        else{
                            return []
                        }
                    }
                )
                
                ads2= await Promise.all(promise2)
                //console.log(ads2,ads2[0].length)
               if (all_ads.length === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })
                    console.log(all_ads)
                
                //return ads2
                //console.log(ads2[0][0][0])
                }
                else {console.log('in')
                        const pcat = await Category.findOne({_id : categoryI.parentId});
                        if(pcat.parentId === undefined){
                            console.log(pcat.parentId)
                            promise2 = await categoryList.map(async (cat) => {
                            //console.log(pcat)
                           // console.log(cat._id.toString(), pcat._id.toString())
                            if (cat._id.toString() === pcat._id.toString()) {    
                                promise1 = await cat.children.map(async (cat1) => {
                                     //console.log(cat1._id.toString(),categoryI._id.toString() )
                                     //console.log(cat1.children.length)
                                     if (cat1.children.length > 0) { 
                                        if (cat1._id.toString() === categoryI._id.toString()) {
                                            
                                            if (cat1.children.length > 0) {
                                        promises = await cat1.children.map(async (child) => {
                                            console.log(child.name)
                                            const result = new features(Ad.find({ categoryID: child._id.toHexString() }), req.query).filtering().sorting().paginating()
                                            const child_ads = await result.query
                                            /* Array.prototype.push.apply(all_ads, child_ads);
                                             */
                                            //console.log(child_ads)
                                            Array.prototype.push.apply(all_ads, child_ads)
                                            //all_ads= all_ads.concat(child_ads);
                                            //console.log(all_ads)
                                            return all_ads;
                                        })}
                                        else{
                                            return all_ads;
                                        };
                                        const ads = await Promise.all(promises)
                                        //console.log(ads)
                                        return ads
                                    }}
                                    else{
                                        return  []
                                    }

                                });const ads1 = await Promise.all(promise1)
                                //console.log(ads1)
                                return ads1
                            }   else {
                                return []
                            } 
                    }
                )
                
                        ads2= await Promise.all(promise2)
                        console.log(ads2,ads2[0].length)
                        if (all_ads === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })
                        
                        //console.log(ads2.length)
                                
                        }
                        else{
                            //console.log('in land')
                            const result = new features(Ad.find({ categoryID: categoryI._id.toHexString() }), req.query).filtering().sorting().paginating()
                            const child_ads = await result.query
                            all_ads = child_ads
                        }
                    }
                
                    //console.log(ads2)
                if (all_ads.length === 0) return res.status(404).json({ error: { code: res.statusCode, msg: 'No ads found' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: all_ads })
            }

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
        }
    },
    postAd: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })

            if (user.role !== 2) {  //admin
                return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have permission to access this resource' }, data: null })
            }

            const { name, price, description, categoryID, status, image, area, city, province } = req.body

            if (!image) return res.status(400).json({ error: { code: res.statusCode, msg: 'Image not found' }, data: null })

            const newAd = new Ad({ user, name, price, description, categoryID, status, image, area, city, province })
            if (!newAd) return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad not created' }, data: null })

            const ad = await newAd.save()

            const savedAd = await User.findOneAndUpdate({ _id: user._id }, { $push: { ads: newAd._id } });
            if (!savedAd || !ad) return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad not added to database' }, data: null })

            return res.status(200).json({ error: { code: null, msg: null }, data: "Ad Posted Successfully" })

        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    },


    /*  deleteAd: async (req, res) => {
         try {
             const user = await User.findById(req.user.id)
             if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })
 
             if (user.role === 1) { //if user is admin
                 return res.status(400).json({ error: { code: res.statusCode, msg: 'You are not  allowed to access this resource' }, data: null })
             }
 
             if (!req.params.id) {
                 return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad ID is missing' }, data: null })
             }
          
             if (!user.ads.some(ad => (ad._id.toString() === req.params.id)))
             return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have the permission to delete this Ad' }, data: null })
 
             const deletedAd = await Ad.findByIdAndDelete(req.params.id)//from Advertisement model
             const deletedAdUser = await User.findOneAndUpdate({'_id': new ObjectId(req.user.id)}, 
                 { $pull: { ads: { _id : new ObjectId(req.params.id)} } })//from User model
            // const deletedAdComplaint = await Complaint.findOneAndDelete({'reported':1},{'reportedAgainst':req.params.id})//from Advertisement model
 
             if (!deletedAd || !deletedAdUser || !deletedAdComplaint) return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad not deleted' }, data: null })
 
             return res.status(200).json({ error: { code: null, msg: null }, data: null })
 
         } catch (err) {
             return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })
         }
     }, */

    updateAd: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({ error: { code: res.statusCode, msg: 'No user found' }, data: null })

            if (user.role === 1) { //if user is admin

                if (!req.params.id) { // if no id, error
                    return res.status(400).json({ error: { code: res.statusCode, msg: 'Ad ID missing' }, data: null })
                }

                const status = req.body.status;
                const ad = await Ad.findOneAndUpdate({ _id: req.params.id }, status, { new: true })
                if (!ad) return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad not updated' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: ad })
            }

            else if (user.role === 2) {// user is customer

                if (!req.params.id) { // id is not present   
                    return res.status(400).json({ error: { code: res.statusCode, msg: 'Ad ID missing' }, data: null })
                }

                if (!user.ads.some(ad => (ad.toString() === req.params.id)))
                    return res.status(403).json({ error: { code: res.statusCode, msg: 'You do not have the permission to update this Ad' }, data: null })

                const { name, price, description, categoryID, status, image, area, city, province } = req.body;

                const ad = await Ad.findOneAndUpdate({ _id: req.params.id }, { name, price, description, categoryID, status, image, area, city, province }, { new: true });
                if (!ad) return res.status(404).json({ error: { code: res.statusCode, msg: 'Ad not updated' }, data: null })

                return res.status(200).json({ error: { code: null, msg: null }, data: "Ad Information successfully updated" })
            }
        } catch (error) {
            return res.status(500).json({ error: { code: res.statusCode, msg: res.statusMessage }, data: null })

        }
    }
}


module.exports = advertisementController


