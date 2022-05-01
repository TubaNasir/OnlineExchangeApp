import AdList from './AdList'
import FilterPanel from './FilterPanel'
import '../UI/AdvertisementsFiltered.css'
import  Pagination  from './Pagination'

const AdvertisementsFiltered = () => {


  return (
    <div className='home'>
      <div className='home_panelList-wrap'>
        <div className='home_panel-wrap'>
          
          <FilterPanel />
        </div>
        <div className='home_list-wrap'>
          <AdList />
        </div>

      </div>
      <Pagination/>
    </div>
  )
}

export default AdvertisementsFiltered