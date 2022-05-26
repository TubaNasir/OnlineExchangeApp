import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import AdList from './AdList'
import FilterPanel from './FilterPanel'
import '../UI/AdvertisementsFiltered.css'
import  Pagination  from './Pagination'

const AdvertisementsFiltered = () => {
  
  const state = useContext(GlobalState)
  const[count] = state.AdvertisementAPI.count
  const [page] = state.AdvertisementAPI.page
  const [limit] = state.AdvertisementAPI.limit
  const [city] = state.AdvertisementAPI.city
  const [province] = state.AdvertisementAPI.province

  const [viewedAds, setViewedAds] = useState(3)
  
  useEffect(() =>{
    let ads = (page)*limit;
    
    if (ads>count){
      ads = count;
    }
    setViewedAds(ads)
  },[page,count])

  return (
    <div className='home'>
      {(count !==0 )?<><div className='t'>{viewedAds} Results of {count}                          {city!==''?<span className='span_filters'>{city}; {province}</span>: null}
</div>
                          </> : <div className='t'>No ads found</div>}
      <div className='home_panelList-wrap'>
      
        <div className='home_panel-wrap'>
          
          <FilterPanel />
        </div>
        {(count !==0 )?<div className='home_list-wrap'>
          <AdList />
        </div>: null}

      </div>
      <Pagination/>
    </div>
  )
}

export default AdvertisementsFiltered