import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/Pagination.css'


const Pagination = () => {
  const state = useContext(GlobalState)
  const [page, setPage] = state.AdvertisementAPI.page
  const [limit, setLimit] = state.AdvertisementAPI.limit

  const [pageLimit, setPageLimit] = useState(2)
  const [minPageLimit, setMinPageLimit] = useState(0)
  const [maxPageLimit, setMaxPageLimit] = useState(2)
  const [count, setCount] = state.AdvertisementAPI.count
  const [pages, setPages] = useState([])
  console.log(count)
  console.log('pageslist', pages)
  console.log('page', page)
  
  const handleClick = (e) => {
    setPage(e.target.value)
  }

  const handlePrev = (e) => {
    setPage(page - 1)

    if ((page - 1) % pageLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageLimit)
      setMinPageLimit(minPageLimit - pageLimit)
    }
  }

  const handleNext = (e) => {
    setPage(page + 1)

    if (page + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageLimit)
      setMinPageLimit(minPageLimit + pageLimit)
    }
  }

  
  /* let pageIncrementBtn = null
  if (pages.length > maxPageLimit) {
    pageIncrementBtn = <li>&hellip;</li>
  }

  let pageDecrementBtn = null
  if (pages.length < minPageLimit + pageLimit) {
    pageDecrementBtn = <li>&hellip;</li>
  } */

  const renderPages = pages.map((p) => {

    if (p < maxPageLimit + 1 && p > minPageLimit) {
      return (<li key={p} value={p} onClick={handleClick}
        className={page === p ? 'active' : null} >{p}</li>
      )
    }
    else {
      return null
    }

  });

  const setPageCount =async () => {
    setPages([])
    const pageCount = Math.ceil(count / limit);
    if (pageCount === 1) return null;
    for (let i = 1; i <= pageCount; i++) {
      setPages(pages => [...pages,i]);
    }
    setMinPageLimit(0)
    setMaxPageLimit(2)
  } 

  useEffect(()=>{
   setPageCount()
  },[count])

  return (
    <div>
      <nav className='d-flex justify-content-center'>
        <ul className='pageNumbers'>
          <li>
            <button onClick={handlePrev}
              disabled={page === pages[0] || pages.length===0 ? true : false}>
              Prev
            </button>
          </li>
         {/*  {pageDecrementBtn} */}
          {renderPages}
          {/* {pageIncrementBtn} */}
          <li>
            <button onClick={handleNext}
              disabled={page === pages[pages.length-1] || pages.length===0? true : false}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination