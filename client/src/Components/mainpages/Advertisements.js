import React,{useContext, useEffect} from 'react'
import SubHeader from './SubHeader'
import { GlobalState } from '../../GlobalState'
import { useParams } from 'react-router-dom'
import {getAllAdsbySlugAPI, getAllAdsAPI, countAdsAPI, countAdsbySlugAPI} from '../../api/AdvertisementAPI'
import AdvertisementsFiltered from './AdvertisementsFiltered'

function Advertisements() {
  const params = useParams();
    const state = useContext(GlobalState)
    const [price] = state.AdvertisementAPI.price
    const [advertisements, setAdvertisements] = state.AdvertisementAPI.advertisements
    const [city] = state.AdvertisementAPI.city
    const [province] = state.AdvertisementAPI.province
    const[sortPrice, setSortPrice] = state.AdvertisementAPI.sortPrice
    const [sortAds, setSortAds] = state.AdvertisementAPI.sortAds
    const [page] = state.AdvertisementAPI.page
    const [limit] = state.AdvertisementAPI.limit
    const [search, setSearch] = state.AdvertisementAPI.search
    const [count,setCount] = state.AdvertisementAPI.count
    const [status, setStatus] = state.AdvertisementAPI.status
    
    console.log(advertisements)
    
    useEffect(() => {
      try {
        if(params.slug){
      getAllAdsbySlugAPI(params.slug,price,province,city,sortPrice,sortAds,page,limit,search,status)
      .then(res => {
          console.log(res.data)
          setAdvertisements(res.data.data)
      })
      .catch(err => {
          console.log(err.response.data)
          //alert(err.response.data.error.msg)
      })
    }
    else{
      getAllAdsAPI(price,province,city,sortPrice,sortAds,page,limit,search,status)
      .then(res => {
          console.log(res.data)
          setAdvertisements(res.data.data)
      })
      .catch(err => {
          console.log(err.response.data)
          alert(err.response.data.error.msg)
      })
    }
    
  }
      catch (err) {
          alert(err.response.data.msg)
      }
  },[params.slug,price, city,province,sortPrice, sortAds,page,limit,search,status])

  useEffect(() => {
    try{
      if (params.slug){
        countAdsbySlugAPI(params.slug,price,province,city,search,status)
        .then(res => {
            console.log(res.data)
            setCount(res.data.data)
        })
        .catch(err => {
            console.log(err.response.data)
            setCount(0)
            //alert(err.response.data.error.msg)
        })
      }
      else{
        countAdsAPI(price,province,city,search,status)
        .then(res => {
            console.log(res.data)
            setCount(res.data.data)
        })
        .catch(err => {
            console.log(err.response.data)
            setCount(0)
            //alert(err.response.data.error.msg)
        })
      }
    }
    catch(err){
      alert(err.response.data.msg)
    }
  },[params.slug,price, city,province,search,status])
    
  return (
    <>
    <SubHeader/>
    {}
    <AdvertisementsFiltered/>
    </>
  )
}

export default Advertisements