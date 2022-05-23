import {useState, useEffect} from 'react'
import axios from 'axios'

export default function AdvertisementAPI(){
    const [advertisements, setAdvertisements] = useState([])
    const [callback, setCallBack] = useState(false)
    const [slug, setSlug] = useState()
    const [search, setSearch] =useState('')
    const [price, setPrice] =useState([0,100000])
    const[sortPrice, setSortPrice] = useState('')
    const [sortAds, setSortAds] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [count, setCount] = useState(0)
    
/*     useEffect(() => {
        const getAdvertisements = async () => {
            try {
                await axios.get(`/ad/all_ads`)
                    .then(res => {
                        console.log(res.data)
                        setAdvertisements(res.data.data)
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
        getAdvertisements()
    }, [callback]) */

    return{
        advertisements: [advertisements, setAdvertisements],
        callback: [callback, setCallBack],
        slug: [slug, setSlug], 
        search: [search, setSearch],
        price: [price, setPrice],
        city: [city, setCity],
        province: [province, setProvince],
        sortPrice: [sortPrice, setSortPrice],
        sortAds: [sortAds, setSortAds],
        page: [page, setPage],
        limit: [limit, setLimit],
        count: [count, setCount]
        
    }
}

export const getAdInfoAPI = async (id) => {
    return await axios.get(`/ad/ad_info/${id}`)
}

export const getAllAdsAPI = async (price,province,city,sortPrice,sortAds,page,limit) => {
    return await axios.get(`/ad/all_ads?price[gte]=${price[0]}&price[lte]=${price[1]}&${city}&${province}&${sortPrice}&${sortAds}&page=${page}&limit=${limit}`)
}

export const countAdsAPI = async (price,province,city) => {
    return await axios.get(`/ad/count_ads?price[gte]=${price[0]}&price[lte]=${price[1]}&${city}&${province}`)
}

export const countAdsbySlugAPI = async (slug,price,province,city) => {
    return await axios.get(`/ad/count_ads/${slug}?price[gte]=${price[0]}&price[lte]=${price[1]}&${city}&${province}`)
}

export const getAllAdsbySlugAPI = async (slug, price, province,city,sortPrice,sortAds,page,limit) => {
    return await axios.get( `/ad/all_ads/${slug}?price[gte]=${price[0]}&price[lte]=${price[1]}${city}&${province}&${sortPrice}&${sortAds}&page=${page}&limit=${limit}`)
}

export const postAdAPI = async (ad, token) => {
    console.log('in method')
    return await axios.post(`/ad/post_ad`, ad,  {
        headers: {Authorization: token}
    })
}

export const uploadImageAPI = async (formData, token) => {
    return await axios.post('/ad/upload_image', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
    })
}

export const updateAdAPI = async (id,token) => {
    await axios.put(`/ad/update_ad/${id}`,   {
    headers: {Authorization: token}
})
}