import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CategoryAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)


    useEffect(() => {

        const getCategories = async () => {
            try {
                await axios.get('/category/all_categories')
                    .then(res => {
                        console.log(res.data)
                        setCategories(res.data.data)
                    })
                    .catch(err => {
                        console.log(err.response.data)
                        alert(err.response.data.error.msg)
                    })
            }
            catch (err) {
                alert(err.response.data.msg)
            }
        }
        getCategories()

    }, [callback])

    const uploadImage = async (formData, token) => {
        return await axios.post('/category/upload_image', formData, {
            headers: { 'content-type': 'multipart/form-data', Authorization: token }
        })
    }


    return {
        uploadImage: uploadImage,
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}


export const uploadImagee = async (formData, token) => {
    return await axios.post('/category/upload_image', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
    })
}

export const createCategory = async ( category , token) => {
    return await axios.post('/category/create',  category , {
        headers: { Authorization: token }
    })
}

export const updateCategoryAPI = async (category , token) => {
    return await axios.put('/category/update',  category , {
        headers: { Authorization: token }
    })
}

export const deleteCategoryAPI = async (category , token) => {
    return await axios.delete('/category/delete',  category , {
        headers: { Authorization: token }
    })
}


export const getAllCategoriesAPI = async () => {
    return await axios.get('/category/all_categories')
}

export const getCategoryInfoAPI = async (slug) => {
    return await axios.get('/category/category_info', slug)
}