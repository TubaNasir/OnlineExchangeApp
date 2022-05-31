const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class features {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
        console.log(queryObj)
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(e => delete(queryObj[e]))
       console.log(queryObj)
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

       console.log(queryStr)
       this.query.find(JSON.parse(queryStr))
       return this;
    }   
       sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            console.log('sortBy:', sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

     paginating(){
        const results = {}
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
         
        this.query = this.query.skip(skip).limit(limit)
        return this;
        }  
    }

const userController = {
    register: async (req,res) => {
        try {

            const {name, email, contact, password, province, city, gender,role} = req.body;

            if (!name || !email || !contact || !password || !province || !city || !gender || !role) 
                return res.status(400).json({error:{code: res.statusCode, msg: 'User info is incomplete'}, data: null}) 


            if(role !== 2){
                return res.status(403).json({error:{code: res.statusCode, msg: 'You do not have permission to access this resource'}, data: null}) 
            }

            if (password.length < 8) return res.status(400).json({error:{code: res.statusCode, msg: 'Password must be atleaast 8 characters long'}, data: null}) 


            const user = await User.findOne({email})

            if (user) return res.status(409).json({error:{code: res.statusCode, msg: 'Email already exists'}, data: null}) 

            if (password.length < 8) return res.status(400).json({error:{code: res.statusCode, msg: 'Password must be atleaast 8 characters long'}, data: null}) 

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({name, email, contact, password: hashedPassword, province, city, gender})

            const newUserSaved = await newUser.save()
            if (!newUserSaved) return res.status(404).json({error:{code: res.statusCode, msg: 'User Not Registered'}, data: null}) 

            res.json({error:{code: null, msg: null}, data: "Registered Successfully"})
            

        } catch (err) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
        }
    },

    login: async (req,res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) return res.status(401).json({error:{code: res.statusCode, msg: 'Email does not exist'}, data: null}) 

            const comparePassword = await bcrypt.compare(password, user.password)

            if (!comparePassword) return res.status(401).json({error:{code: res.statusCode, msg: 'Incorrect password'}, data: null}) 


            const accessToken = createAccessToken({id: user._id})
            if (!accessToken) return res.status(404).json({error:{code: res.statusCode, msg: 'No access token'}, data: null}) 

            const refreshToken = createRefreshToken({id: user._id})
            if (!accessToken) return res.status(404).json({error:{code: res.statusCode, msg: 'No refreshToken token'}, data: null}) 


            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({error:{code: null, msg: null}, data:{accessToken: accessToken}})

        } catch (error) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
        }
        
    },

    getUserInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({error:{code: res.statusCode, msg: 'No User Found'}, data: null}) 

            if(user.role === 1){ //if user is admin

                if(req.params.id){
                    const user1 = await User.findById(req.params.id).select("-password")
                    if (!user1) return res.status(404).json({error:{code: res.statusCode, msg: 'No User Found'}, data: null}) 
                    return res.status(200).json({error:{code: null, msg: null}, data: user1}) 
                } 
                
                return res.status(200).json({error:{code: null, msg: null}, data: user}) 
                
            }

            else if (user.role === 2){// user is customer
                
                if(req.params.id){
                    const user1 = await User.findById(req.params.id).select("-password")
                    if (!user1) return res.status(404).json({error:{code: res.statusCode, msg: 'No User Found'}, data: null}) 
                    return res.status(200).json({error:{code: null, msg: null}, data: user1}) 
                } 
                
                return res.status(200).json({error:{code: null, msg: null}, data: user}) 
                
            }      
        } catch (error) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null}) 
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const result = new features(User.find().select("-password"), req.query).filtering().sorting().paginating()
          
            const all_users = await result.query
            if (!all_users) return res.status(404).json({error:{code: res.statusCode, msg: 'No user found'}, data: null}) 

            return res.status(200).json({error:{code: null, msg: null}, data: all_users})                 
    
        } catch (error) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null})  
        }
    },

    refreshToken: (req,res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(404).json({error:{code: res.statusCode, msg: 'Please login or register'}, data: null}) 


            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(500).json({error:{code: res.statusCode, msg: 'Please login or register'}, data: null}) 


                const accessToken = createAccessToken({id: user.id})
                return res.status(200).json({error:{code: null, msg: null}, data: accessToken}) 
            })

        } catch (err) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null})  
        }
    },

    logout: async (req,res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.status(200).json({error:{code: null, msg: null}, data: "Successfully Logged out"}) 
        }
        catch(err){
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null})  
        }
    },

    addToCart: async (req,res) => {
        try{
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const ad = await User.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            }, {new: true})

            if (!ad) return res.status(404).json({error:{code: res.statusCode, msg: 'User not updated'}, data: null}) 

            return res.status(200).json({error:{code: null, msg: null}, data: ad}) 

        }
        catch (error) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null})  
        }
    },

    updateUserInfo: async (req,res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(404).json({error:{code: res.statusCode, msg: 'No user found'}, data: null}) 

            if(user.role === 1){ //if user is admin

                if(!req.params.id){ // if no id, error
                    return res.status(400).json({error:{code: res.statusCode, msg: 'User ID missing'}, data:null}) 
                }

                const {status, reported} = req.body;
                const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {status,reported}, {new: true})
                if (!updatedUser) return res.status(404).json({error:{code: res.statusCode, msg: 'User not updated'}, data: null}) 

                return res.status(200).json({error:{code: null, msg: null}, data: 'Updated'}) 
            }

            else if (user.role === 2){// user is customer

           
                const {name, contact, password, province, city, ads, favourites, status,cart} = req.body;
                console.log(name, contact, password, province, city, ads, favourites, status,cart)
                const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, {name, contact, password, province, city, ads, favourites,status,cart}, {new: true});
                if (!updatedUser) return res.status(404).json({error:{code: res.statusCode, msg: 'User not updated'}, data: null}) 
                
                return res.status(200).json({error:{code: null, msg: null}, data: updatedUser}) 
            }  
            
        } catch (error) {
            return res.status(500).json({error:{code: res.statusCode, msg: res.statusMessage}, data: null})  
        }
    }
}

    const createAccessToken = (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '100s'})
    }

    const createRefreshToken = (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '150s'})
    }


module.exports = userController