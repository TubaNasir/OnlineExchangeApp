import React, { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/AdList.css'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'


const AdList = () => {
    const state = useContext(GlobalState)
    const[advertisements] = state.AdvertisementAPI.advertisements
    const[user] = state.UserAPI.user
    const[count] = state.AdvertisementAPI.count
    const [page] = state.AdvertisementAPI.page
    const [limit] = state.AdvertisementAPI.limit
    const [viewedAds, setViewedAds] = useState(3)
    const [flag, setFlag] = useState(true)


  console.log('page', page)
  console.log('limit', limit)
  console.log('ads', viewedAds)
console.log('adv', advertisements)
    useEffect(() =>{
      let ads = (page)*limit;
      
      if (ads>count){
        ads = count;
      }
      setViewedAds(ads)
    },[page,count])

  return (
    <div>
      <Col className="products">
            {
                advertisements.map(advertisement => {
                    return (<Link id="ad" to={`/ad/${advertisement._id}`}><ul className='list'>
                <AdDetails key={advertisement._id} advertisement={advertisement} /></ul></Link>)
                })
            } 
  
            
        </Col>

    </div>
  )
}

export default AdList