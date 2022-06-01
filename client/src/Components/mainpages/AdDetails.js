import React, { useState, useEffect, useContext, useRef } from 'react'
import '../../Components/UI/AdDetails.css'
import moment from 'moment'
import { BsHeart } from 'react-icons/bs'
import { GlobalState } from '../../GlobalState'
import { MdClose } from 'react-icons/md'

function AdDetails({ advertisement, del, tag }) {

    const state = useContext(GlobalState)
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [user] = state.UserAPI.user
    const [isUserAd, setIsUserAd] = useState(false)


    useEffect(() => {
        const setAdUser = async () => {
            var check = user.ads?.every(item => {
                return item !== advertisement._id
            });
            if (check)
                setIsUserAd(false)
            else
                setIsUserAd(true)

        }
        setAdUser()
    }, [])
    /* const isUserAd = () => {
        var check =  user.ads?.every(item => {
            console.log(item)
            return item !== advertisement._id
        });console.log(check)
         return check;
    } */
    console.log(isUserAd)


    return (
        <li className='list'>
            <article className='a'>
                <div className='image'>
                    <img className='img1' src={advertisement.image[0].url} alt='' />
                    {tag ? <div className='tag'>
                        <span className='span_tag'>{advertisement.status}</span>
                    </div> : null}
                </div>
                <div className='ad_details'>
                    <div className='details1'>
                        <div className='name'>{advertisement.name}</div>
                        <div className='price_div'>
                            <span>Rs. {advertisement.price}</span>
                        </div>
                        <div>
                            {del ? <MdClose className='delete' /> : null}
                        </div>
                        {(!isAdmin || isUserAd) ? null : <div className='favourite'>
                            <div className='favourite_icon_div'>
                                <div className='favourite_icon'><BsHeart /></div>
                            </div>

                        </div>}



                    </div>
                    <div className='location'>
                        <div className='loc'>
                            <span className='city'>{advertisement.city}
                            </span>
                            <span className='time'>{moment(advertisement.createdAt).fromNow()}</span>

                        </div>
                    </div>
                </div>

            </article>
        </li>
    )
}

export default AdDetails