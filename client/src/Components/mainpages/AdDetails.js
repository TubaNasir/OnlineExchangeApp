import React, { useState, useEffect, useContext, useRef } from 'react'
import '../../Components/UI/AdDetails.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { BsHeart } from 'react-icons/bs'
import { GlobalState } from '../../GlobalState'
import { FaRegTimesCircle } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { updateCartAPI } from '../../api/UserAPI';


function AdDetails({ advertisement, del, tag }) {

    const state = useContext(GlobalState)
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    const [user, setUser] = state.UserAPI.user
    const [token] = state.UserAPI.token
    const [cart, setCart] = state.UserAPI.cart
    console.log(tag, del)
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

    const updateCart = async (c) => {
        console.log(c)
        const cart = c
        updateCartAPI({ cart: c }, token)
            .then(res => {
                console.log(res.data);
                setUser(res.data.data)
            })
            .catch(err => {
                console.log(err.response)
            })

    }

    const removeFromCart = async (id) => {
        cart.forEach((item, index) => {
            if (item === id) {
                cart.splice(index, 1)
            }
        })

        setCart([...cart])
        updateCart(cart)
    }
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
                        <Link id="ad" to={`/ad/${advertisement._id}`}>
                            <div className='name'>{advertisement.name}</div></Link>
                        <div className='price_div'>
                            <span>Rs. {advertisement.price}</span>
                        </div>
                        {del ? <div>
                            <button className='as' onClick={() => removeFromCart(advertisement._id)}><FaRegTimesCircle className='delete' /></button></div> : null}

                        {/*  {(!isAdmin || isUserAd) ?  null:<div className='favourite'>
                    <div className='favourite_icon_div'>
                        <div className='favourite_icon'><BsHeart/></div>
                    </div>
                    <div className='location'>
                        <div className='loc'>
                            <span className='city'>{advertisement.city}
                            </span>
                            <span className='time'>{moment(advertisement.createdAt).fromNow()}</span>

                        </div>
                    </div>
                </div>

                </div> } */}



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