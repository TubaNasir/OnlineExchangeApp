import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { registerAPI } from '../../api/UserAPI';
import { GlobalState } from '../../GlobalState'


function Profile() {


  const state = useContext(GlobalState)
  const [user, setUser] = state.UserAPI.user
  // const [detail, setDetail] = useState([])

  //setDetail(user)
  //console.log(detail)

  console.log(user)

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  /* const changeSubmit = async e => {
    console.log(e.)
      })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data.error.msg)
      })
 */


  return (
    <div className='container col-md-6'  >
      <div className='card mt-4'>

        <div className="card-header">
          <h4>Profile</h4>
        </div>

        <div className='card-body'>
          <form >
            <div className='form-group mb-3'>
              <text>Full Name</text>
              <input type='text' name='name' placeholder={user.name} value={user.name} className='form-control' onChange={onChangeInput} />
            </div>
            <div className='form-group mb-3'>
              <text>Email</text>
              <input type='text' name='email' placeholder={user.email} value={user.email} className='form-control' onChange={onChangeInput} />
            </div>
            <div className='form-group mb-3'>
              <text>Contact</text>
              <input type='number' name='email' placeholder={user.contact} value={user.contact} className='form-control' />
            </div>

            <div className='Col-sm-12'>

              <div className='form-group col-md-6 mb-3'>
                <label className='mb-2'>Province</label>
                <select name='province' className='form-control' value={user.province} onChange={onChangeInput} >

                  <option hidden>{user.province}</option>
                  <option>Sindh</option>
                  <option>Punjab</option>
                  <option>Balochistan</option>
                  <option>KPK</option>
                </select>

              </div>
            </div>
            <div className='form-group mb-3'>
              <button type='submit'
                className='btn btn-danger px-4 mt-2'
                value='Submit'>Save Changes
              </button>
            </div>


          </form>
        </div>
      </div>
    </div>
  )
}


export default Profile