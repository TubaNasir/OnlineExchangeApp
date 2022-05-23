import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/AdList.css'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import AdDetails from './AdDetails'


const AdList = () => {
    const state = useContext(GlobalState)
    const[advertisements] = state.AdvertisementAPI.advertisements

  return (
    <div>
      <Col className="products">
            {
                advertisements.map(advertisement => {
                    return (<ul><AdDetails key={advertisement._id} advertisement={advertisement} /></ul>)
                })
            } 
        </Col>

    </div>
  )
}

export default AdList