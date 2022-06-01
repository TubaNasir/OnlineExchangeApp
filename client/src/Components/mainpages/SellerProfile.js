import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { registerAPI } from '../../api/UserAPI';
import { GlobalState } from '../../GlobalState';

function SellerProfile() {

    const state = useContext(GlobalState)
    const [allUsers] = state.UserAPI.allUsers
    const params = useParams()
    const [seller, setSeller] = state.UserAPI.seller

    const [allAdvertisements, setAllAdvertisements] = state.AdvertismentAPI.allAdvertisements
    const [advertisements, setAdvertisements] = state.AdvertismentAPI.advertisements

    console.log(seller)

    return (
        <li className='list'>

            <div className='seller_details'>
                <div className='details1'>
                    <div className='name'>{seller.name}</div>
                </div>
                <div>

                </div>

            </div>


        </li>
    )
}

export default SellerProfile
