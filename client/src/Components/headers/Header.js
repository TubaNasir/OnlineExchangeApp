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

                    <li>
                        <div className='searchBar-wrap'>
                            <IoMdSearch className='searchIcon' />
                            <input
                                type='text'
                                placeholder='search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />


                        </div>
                    </li>
                    <div>
                        <Link to="/post_ad"><FaPlusCircle className='icon' size={30} /></Link>
                    </div>
                    <div className='c'><Link to='/cart'><span className='cart_l'>{isLogged ? user.cart.length : 0}</span><FaShoppingCart className='header_icon' size={25} /></Link></div>
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
                            <div className={menuClass} aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/profile">My Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">My Ads</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">My Orders</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">My Favourites</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Customer Support</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/" onClick={logoutUser}>Logout</a>
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