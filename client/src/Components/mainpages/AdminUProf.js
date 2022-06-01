import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'
import UserDetails from './UserDetails'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import '../UI/AdminUProf.css'

function AdminUProf() {

    const state = useContext(GlobalState)

    const [allUsers, setAllUsers] = state.UserAPI.allUsers
    const { id } = useParams()
    console.log(id)
    const [userx, setUserx] = useState([])
    const [allAdvertisements] = state.AdvertisementAPI.allAdvertisements
    const [ad, setAd] = useState([])
    const [addr, setAddr] = useState([])



    useEffect(() => {
        const setUser = async () => {
            console.log(id)
            await allUsers.forEach(userx => {
                //console.log(ad._id)
                if (userx._id === id) {
                    setUserx(userx)
                    setAddr(userx.ads)
                }
            })

        }
        setUser();

    }, [id, allUsers])

    console.log(userx)
    console.log(addr)


    useEffect(() => {
        setAd([])
        const adds = async () => {
            addr.forEach((adx) => {
                console.log(adx)
                allAdvertisements.forEach((add) => {
                    console.log(add._id)
                    if (adx === add._id) {
                        setAd(ad => [...ad, add])

                    }

                })
            })
        }

        adds()
    }, [userx])

    console.log(ad)

    if (userx.length == 0) {

        return null
    }

    if (ad.length == 0) {
        return 'No Ads'
    }

    if (addr.length == 0) {
        return null
    }


    return (
        <div>
            <div className='detail'>
                <img src={userx.image} alt="" />
                <div className='box-detail'>
                    <div className='row'>
                        <h2>{userx.name}</h2>

                    </div>
                    <br></br>
                    <span>EMAIL:   {userx.email}</span>
                    <p>ADDRESS:   {userx.area} {userx.city} ,{userx.province} </p>
                    <p>CONTACT: {userx.contact} </p>
                    <p>GENDER: {userx.contact}</p>

                </div>
            </div>
            <div>

                <Col className="products">
                    {
                        ad.map(advertisement => {
                            return (<Link id="ad" to={`/ad/${advertisement._id}`}><ul className='list'>
                                <AdDetails key={advertisement._id} advertisement={advertisement} /></ul></Link>)
                        })
                    }


                </Col>
            </div>

        </div>
    )

}

export default AdminUProf