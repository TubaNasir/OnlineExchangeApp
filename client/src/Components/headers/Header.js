import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { logoutAPI } from '../../api/UserAPI'
import { IoMdSearch } from 'react-icons/io'
import { FaPlusCircle, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './Header.css'

function Header() {
    let navigate = useNavigate()
    const state = useContext(GlobalState)
    const [dropdown, setDropdown] = useState(false)

    const handleDropdown = () => { setDropdown(!dropdown) }
    const [isLogged, setIsLogged] = state.UserAPI.isLogged
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin
    const [user] = state.UserAPI.user
    const [search, setSearch] = state.AdvertisementAPI.search


    const router = () => {
        if (!isAdmin) {
            return (
                <>
                    <div className='header'>
                        <li>{/* <form className="form-inline my-2 my-lg-0 ml-auto ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <span className="input-group-btn">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </span>
                </form> */}

                            {/* <div className='img'>
                            <img src={user.image} alt="" />
                        </div>
 */}
                            <div className='searchBar-wrap'>
                                <IoMdSearch className='searchIcon' />
                                <input
                                    type='text'
                                    placeholder='search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />


                            </div>
                        </li>
                        <span>
                            <Link to="/post_ad"><FaPlusCircle className='icon' size={30} /></Link>
                        </span>
                        <span><Link to='/cart'><FaShoppingCart className='header_icon' /></Link></span>
                    </div>
                </>
            )
        }
        else if (isAdmin) {
            return (
                <>
                    <li className="nav-item active">
                        <a className="nav-link" href="/">ADS<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/userdetails">USERS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/orders">ORDERS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/complaints">COMPLAINTS</a>
                    </li>
                </>
            )
        }
    }


    const dropdownRouter = ({ user }) => {
        if (!isLogged) {
            return (

                <a className="nav-link align-right" href="/login">LOGIN/SIGNUP</a>
            )
        }

        else {
            if (isAdmin) {
                const menuClass = `dropdown-menu${dropdown ? "show" : ""} dropdown-menu-right position-absolute`
                return (
                    <>
                        <li className="nav-item dropdown ">
                            <div className="nav-link dropdown-toggle" onClick={handleDropdown} href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ADMIN
                            </div>
                            <div className={menuClass} aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Review Ads</a>
                                <a className="dropdown-item" href="/">Customer Support</a>
                                <a className="dropdown-item" href="/category">Categories</a>
                                <a className="dropdown-item" href="/" onClick={logoutUser}>Logout</a>

                            </div>
                        </li>
                    </>

                )
            }
            else if (!isAdmin) {
                const menuClass = `dropdown-menu${dropdown ? "show" : ""} dropdown-menu-right position-absolute`
                return (
                    <>
                        <li className="nav-item dropdown ">
                            <div className="nav-link dropdown-toggle" onClick={handleDropdown} href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.name}
                            </div>
                            <div className='sidebar'>
                                <ul>

                                    <div className={menuClass} aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/">My Ads</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/">My Orders</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/">My Favourites</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/">Customer Support</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/msg">Messages</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item" href="/" onClick={logoutUser}>Logout</a></li>
                                    </div>
                                </ul>
                            </div>
                        </li>
                    </>
                )
            }
        }

    }

    const logoutUser = async () => {
        logoutAPI()
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">X-CHANGE</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav justify-content-between">
                    {router()}
                </ul>
                <ul className="navbar-nav mr-auto">
                    {dropdownRouter({ user })}
                </ul>
            </div>

        </nav>


    )
}

export default Header