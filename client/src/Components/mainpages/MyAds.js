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
  const [checkAds, setCheckAds] = useState([])
  console.log(user.ads)
  
  useEffect(() => {
    {
        const add = async () => {
          user.ads.forEach( (c) =>{
            allAdvertisements.forEach( (add) => {
            if(c === add._id){
                setCheckAds(checkAds => [...checkAds, add])
    
            }
          
        })})
      }
     
        add()
    }  

    },[])

    if (checkAds.length ===0) return null

  return (
    <div>
      <Title title='My Advertisements'/>
      <Col md={{ span: 8, offset: 2 }}>
            {
              checkAds.map((advertisement) => {
                {
                    return (<ul className='list'>
                <AdDetails key={advertisement._id} advertisement={advertisement} del={false} tag={true}/></ul>)
                  }
                 
              })
                
            } 
  
            
        </Col>

    </div>
  )
}

export default MyAds