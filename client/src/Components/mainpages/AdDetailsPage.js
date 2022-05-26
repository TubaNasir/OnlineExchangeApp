import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/AdDetailsPage.css'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import Title from '../utilities/Title'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import SubHeader from './SubHeader'

function AdDetailsPage() {

    const state = useContext(GlobalState)
    const [advertisements] = state.AdvertisementAPI.advertisements
    const params = useParams()
    const [adDetails, setAdDetails] = useState([])


    useEffect(() => {
        console.log(params.id)
        advertisements.forEach(ad => {

            console.log(ad._id)
            if (ad._id === params.id) setAdDetails(ad)
        })

    }, [params.id, advertisements])
    console.log('params', params.id)

    console.log('ads ', advertisements)
    console.log(adDetails)
    if (adDetails.length === 0) return null;
    return (
        <div>
        <SubHeader/>
        <div className='main_div'>
            
            <div className='first_col'>
                <Carousel className='main-slide' showArrows={true} showStatus={false}>
                        {adDetails.image.map((img)=>{
                            return (<div className='img_div' style={{height:'500px', width:'500px'}}>
                                <img className='im' src={img.url} alt=''/>
                            </div>)
                        })}
                    </Carousel>
            </div>
        </div>
    </div>
    )
}

export default AdDetailsPage