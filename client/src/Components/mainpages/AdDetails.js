import React from 'react'
import '../../Components/UI/AdDetails.css'

function AdDetails({advertisement}) {
  return (
    <li className='list'>
        <article className='a'>
        <div className='image'>
            <img className= 'img1'src={advertisement.image[0].url} alt =''/>
        </div>
        <div className = 'ad_details'>

        </div>
        </article>
    </li>
  )
}

export default AdDetails