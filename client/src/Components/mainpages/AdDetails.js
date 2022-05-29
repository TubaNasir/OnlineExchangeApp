import React from 'react'
import '../../Components/UI/AdDetails.css'
import moment from 'moment'
import {BsHeart} from 'react-icons/bs'

function AdDetails({advertisement}) {
 
  return (
    <li className='list'>
        <article className='a'>
        <div className='image'>
            <img className= 'img1'src={advertisement.image[0].url} alt =''/>
        </div>
        <div className = 'ad_details'>
            <div className='details1'>
                <div className='name'>{advertisement.name}</div>
                <div className='price_div'>
                    <span>Rs. {advertisement.price}</span>
                </div>
                <div className='favourite'>
                    <div className='favourite_icon_div'>
                        <div className='favourite_icon'><BsHeart/></div>
                    </div>

                </div>
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