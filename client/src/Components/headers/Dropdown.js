import React, { useState, useContext } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import UserProfile from '../mainpages/Profile'


function Dropdown() {

  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.UserAPI.isLogged
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin
  const [user] = state.UserAPI.user

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const logoutUser = async () => {
    axios.get('/user/logout')
      .then(res => {
        console.log(res.data)
        localStorage.removeItem('firstLogin')
        setIsLogged(false)
        setIsAdmin(false)
        window.location.href = "/"
      })
      .catch(err => {
        console.log(err.response.data.error.msg)
      })
  }

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        <li>
          <Link to="/profile" className='dropdown-link' onClick={() => setClick(false)}>My Profile</Link>
        </li>

        <li>
          <Link to='/' className='dropdown-link' onClick={() => setClick(false)}>My Ads</Link>
        </li>
        <li>
          <Link to='/' className='dropdown-link' onClick={() => setClick(false)}>My Orders</Link>
        </li>
        <li>
          <Link to='/' className='dropdown-link' onClick={() => setClick(false)}>Favourites</Link>
        </li>
        <li>
          <Link to='/' className='dropdown-link' onClick={() => setClick(false) & logoutUser()}>Logout</Link>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;