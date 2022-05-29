import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalState } from '../../GlobalState'


function Profile() {


  const state = useContext(GlobalState)
  const [user] = state.UserAPI.user
  const [detail, setDetail] = useState([])

  setDetail(user)
  console.log(detail)

  console.log(user)

  return (
    <div className='detail'>
      <img src={detail.image} alt="" />
      <div className='box-detail'>
        <div className='form-group mb-3'>
          <text>Full Name</text>
          <input type='text' name='name' placeholder={detail.name} className='form-control' />
        </div>
        <div className='form-group mb-3'>
          <text>Email</text>
          <input type='text' name='email' placeholder={detail.email} className='form-control' />
        </div>
        <div className='form-group mb-3'>
          <text>Email</text>
          <input type='text' name='email' placeholder={detail.email} className='form-control' />
        </div>
        <div className='form-group mb-3'>
          <text>Contact</text>
          <input type='number' name='email' placeholder={detail.contact} className='form-control' />
        </div>

      </div>
    </div>
  )
}

export default Profile