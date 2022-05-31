import {useState, useEffect} from 'react'
import axios from 'axios'

export default function AdvertisementAPI(){
    const [allAdvertisements, setAllAdvertisements] = useState([])
    const [advertisements, setAdvertisements] = useState([])
    const [callback, setCallBack] = useState(false)
    const [slug, setSlug] = useState()
    const [search, setSearch] =useState('')
    const [price, setPrice] =useState([0,1000000])
    const[sortPrice, setSortPrice] = useState('')
    const [sortAds, setSortAds] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('')
  
    
     useEffect(() => {
        const getAdvertisements = async () => {
            try {
                await axios.get(`/ad/all_advertisements`)
                    .then(res => {
                        console.log(res.data)
                        setAllAdvertisements(res.data.data)
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
    }, [callback]) 

    return{
        allAdvertisements: [allAdvertisements, setAllAdvertisements],
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
        count: [count, setCount],
        status: [status,setStatus]
    }
}

const removeEmptyParams=(params)=>{
      for (const key of Object.keys(params)) {
        if (params[key] === "") {
          delete params[key];
        }
      }
      return params
}


export const getAdsWithoutFilters = async () => {
    return await axios.get(`/ad/all_advertisements`)
}

export const getAdInfoAPI = async (id) => {
    return await axios.get(`/ad/ad_info/${id}`)
}

export const getAllAdsAPI = async (price,province,city,sortPrice,sortAds,page,limit, search,status) => {
    const params1 = {'name[regex]': search,'province': province,'city': city,'sort': sortPrice,'sort': sortAds,'page': page,'limit': limit,'status': status};
    return await axios.get(`/ad/all_ads?price[gte]=${price[0]}&price[lte]=${price[1]}`,{params: removeEmptyParams(params1)})
}

export const countAdsAPI = async (price,province,city,search,status) => {
    const params1 = {'name[regex]': search,'province': province,'city': city,'status': status};
    return await axios.get(`/ad/count_ads?price[gte]=${price[0]}&price[lte]=${price[1]}`,{params: removeEmptyParams(params1)})
}

export const countAdsbySlugAPI = async (slug,price,province,city,search,status) => {
    const params1 = {'name[regex]': search,'province': province,'city': city,'status': status};
    return await axios.get(`/ad/count_ads/${slug}?price[gte]=${price[0]}&price[lte]=${price[1]}`,{params: removeEmptyParams(params1)})
}

export const getAllAdsbySlugAPI = async (slug, price, province,city,sortPrice,sortAds,page,limit,search,status) => {
    const params1 = {'name=[regex]': search,'province': province,'city': city,'sort': sortPrice,'sort': sortAds,'page': page,'limit': limit,'status': status};
    return await axios.get(`/ad/all_ads/${slug}?price[gte]=${price[0]}&price[lte]=${price[1]}`,{params: removeEmptyParams(params1)})
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

export const updateAdAPI = async (id,ad,token) => {
    await axios.patch(`/ad/update_ad/${id}`, ad,  {
    headers: {Authorization: token}
})
}