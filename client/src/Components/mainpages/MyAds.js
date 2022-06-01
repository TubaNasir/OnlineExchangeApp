import React, { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/MyAds.css'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'

function MyAds() {
  const state = useContext(GlobalState)
  const[advertisements] = state.AdvertisementAPI.advertisements
  const[allAdvertisements] = state.AdvertisementAPI.allAdvertisements
  const[user] = state.UserAPI.user

  console.log(user.ads)

  return (
    <div>
      <Title title='My Advertisements'/>
      <Col md={{ span: 8, offset: 2 }}>
            {
              user.ads.forEach((userAd) => {
                allAdvertisements.forEach(advertisement => {
                  console.log(userAd,' ',advertisement._id)
                  if(userAd === advertisement._id){
                    return (<Link id="ad" to={`/ad/${advertisement._id}`}><ul className='list'>
                <AdDetails key={advertisement._id} advertisement={advertisement} /></ul></Link>)
                  }
                    
                })
              })
                
            } 
  
            
        </Col>

    </div>
  )
}

export default MyAds