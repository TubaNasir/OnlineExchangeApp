import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/AdDetailsPage.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SubHeader from './SubHeader'
import { BsHeart } from 'react-icons/bs'
import moment from 'moment'
import Slider from 'react-slick'
import { updateUserInfoAPI } from '../../api/UserAPI'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function AdDetailsPage() {

    const state = useContext(GlobalState)
    const [allAdvertisements] = state.AdvertisementAPI.allAdvertisements
    const [advertisements] = state.AdvertisementAPI.advertisements
    const [categories] = state.CategoryAPI.categories
    const [token] = state.UserAPI.token
    const params = useParams()
    const [adDetails, setAdDetails] = useState([])
    const [seller, setSeller] = useState([])
    const [allUsers] = state.UserAPI.allUsers
    const [user,setUser] = state.UserAPI.user
    const [isLogged] = state.UserAPI.isLogged
    const [main, setMain] = useState([])
    const [sub, setSub] = useState([])
    const [subSub, setSubSub] = useState([])

    const addToCart = async (e) => {
        e.preventDefault()

        if (!isLogged) return alert("Please login to continue buying")

        var check =  user.cart?.every(item => {
            return item !== adDetails._id
        });

        if(check) {
            setUser({...user, cart:[...user.cart, adDetails._id]});   

            updateUserInfoAPI(user,token)
            .then(res => {
                console.log(res.data);
                alert('Product added to cart');
            })
            .catch(err => {
                console.log(err.response)
                alert("Could not add product to cart")
              })
        
            
        }

        else{
            alert('Product already in cart')
        }
    }

    console.log(user)

    const [sliderRef, setSliderRef] = useState(null)

    const sliderSettings = {
        // removes default buttons
        dots: true, arrows: true,
        slidesToShow: 3,
        slidesToScroll: 9,
        infinite: false,

         responsive: [
    {
      breakpoint: 1024,
      settings: {
       slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
       slidesToShow: 1,
      }
     }
  ]
    }

    //const [loading, setLoading] = useState(true)


    useEffect(() => {
        const setAdvertisement = async () => {
            console.log(params.id)
            await advertisements.forEach(ad => {

                //console.log(ad._id)
                if (ad._id === params.id) {
                    setAdDetails(ad)
                }
            })

        }
        setAdvertisement();

    }, [params.id, advertisements])

    useEffect(() => {
        const setSellerDetails = async () => {
            await allUsers.forEach(user => {
                //console.log(user._id)
                if (user._id === adDetails.userId)
                    setSeller(user)
            })
        }
        setSellerDetails()
        //setLoading(false)
    }, [adDetails])

    useEffect(() => {
        const category = async () => {
            await categories.map(async (cat) => {
                if (cat.children) {
                    cat.children.map(scat => {
                        if (scat.children) {
                            scat.children.map(sscat => {
                                console.log(adDetails.categoryID, ' ', sscat._id)
                                if (adDetails.categoryID === sscat._id) {

                                    setMain(cat.name);
                                    setSub(scat.name);
                                    setSubSub(sscat.name);
                                }
                            })
                        }

                    })
                }
            })
        }
        category()
    }, [adDetails])

    console.log('main', main)
    console.log('params', params.id)
    console.log('ad', adDetails)
    console.log('seller', seller)

    if (adDetails.length === 0 || advertisements.length === 0 || allUsers.length === 0 || main.length === 0) return null;
    //if (loading) return <Loading/>
    else return (
        <div>
            <SubHeader />
            <div className='main'>

                <div className='main_div'>
                    <div className='first_col'>
                        <div className='car'>
                            <Carousel className='main-slide' showArrows={true} showStatus={true}>
                                {adDetails.image.map((img) => {
                                    return (<div className='img_div' style={{ height: '500px' }}>
                                        <img className='im' src={img.url} alt='' />
                                    </div>)
                                })}
                            </Carousel>
                        </div>

                        <div className='seller'>
                            <div className='s_div'>
                                <div className='cat_head'>
                                    <span>Seller Details</span>
                                </div>
                                <a href='#'>
                                    <div className='seller_info'>
                                        <img className='seller_img' alt='' />
                                        <div className='seller_name'>
                                            <span className='sname'>{seller.name}</span>
                                            <span className='extra_details'>
                                                Member since {new Date(seller.createdAt).getFullYear()}
                                            </span>
                                            <div className='chat'>
                                                <button className='chat_button'>
                                                    <span>Message Seller</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className='second_col'>
                        <div className='details_div'>
                            <div className='details'>
                                <div className='first_row'>
                                    <div className='adname'>
                                        {adDetails.name}
                                    </div>
                                    <div className='favourite_div'>
                                        <div className='fav'>
                                            <div className='fav_image'><BsHeart /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='price_div'>
                                <span className='price'>
                                    Rs. {adDetails.price}
                                </span>
                            </div>
                            <div className='ex'>
                                <span>{adDetails.city}</span>
                                <span>{moment(adDetails.createdAt).fromNow()}</span>
                            </div>
                        </div>
                        <div className='description_div'>
                            <div className='category_div'>
                                <span className='cat_head'>
                                    Category
                                </span>
                                <div className='cat_div'>
                                    <div className='aa'>
                                        <div className='aaa'>
                                            <span className='key'>
                                                Main Category:
                                            </span>
                                            <span className='value'>
                                                {main}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='aa'>
                                        <div className='aaa'>
                                            <span className='key'>
                                                Sub Category:
                                            </span>
                                            <span className='value'>
                                                {sub}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='aa'>
                                        <div className='aaa'>
                                            <span className='key'>
                                                Category Type:
                                            </span>
                                            <span className='value'>
                                                {subSub}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='category_div'>
                                <span className='cat_head'>
                                    Description
                                </span>
                                <div className='desc'>
                                    {adDetails.description}
                                </div>
                            </div>
                            <div className='category_div' style={{ borderBottom: 'none', marginBottom: 'none', paddingBottom: 'none', bottom: 'none' }}>
                                <span className='cat_head' style={{ display: 'inline-block' }}>
                                    Location
                                </span>

                                <div className='aaa'>
                                    <span className='key'>
                                        Area:
                                    </span>
                                    <span className='value'>
                                        {adDetails.area}
                                    </span>
                                </div>
                                <div className='cat_div'>
                                    <div className='aa'>
                                        <div className='aaa'>
                                            <span className='key'>
                                                City:
                                            </span>
                                            <span className='value'>
                                                {adDetails.city}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='aa'>
                                        <div className='aaa'>
                                            <span className='key'>
                                                Province:
                                            </span>
                                            <span className='value'>
                                                {adDetails.province}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='chat'>
                            <button onClick={addToCart} className='cart_button'>
                                <span>Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='relatedads_div'>
                    <div className='hdiv'>
                        <span className='cat_head'>
                        Related Advertisements
                    </span>
                    <span className='btn_span'>
                        <button className='slider_btn' onCLick={sliderRef?.slickPrev}>
                            <IoIosArrowBack />
                        </button >
                        <button className='slider_btn' onCLick={sliderRef?.slickNext}>
                            <IoIosArrowForward />
                        </button>
                        </span>
                    </div>
                    
                    <div className='content'>
                        
                        <Slider ref={setSliderRef} {...sliderSettings}>
                            {allAdvertisements.filter(adv => adv.categoryID===adDetails.categoryID).map((ad, index ) => (
                                <div className='box_div' style={{width: '28rem'}}>
                                    <article className='art'>
                                        <div className='cat_image_div'>
                                                <img className='cat_img_div' src={ad.image[0].url}/>     
                                        </div>
                                        <div className='cat_details_div'>
                                            <div className='cat_desc_div'>
                                                <div className='cat_name'>{ad.name}</div>
                                                <div className='cat_price'>Rs.{ad.price}</div>
                                            </div>
                                            <div className='cat_extra_div'>
                                                <span>{ad.city}</span>
                                                <span>{moment(ad.createdAt).fromNow()}</span>
                                            </div>
                                        </div>

                                    </article>

                                </div>
                                
                            ))}
                        </Slider>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdDetailsPage