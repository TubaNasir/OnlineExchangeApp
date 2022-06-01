import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
//import PrivateRoute from './PrivateRoute.ts';
import Register from './Register';
import Login from './Login';
import Advertisements from './Advertisements'
import Users from './Users'
import Orders from './Orders'
import Complaints from './Complaints'
import AdminHomepage from './AdminHomepage'
import Profile from './Profile'
import Category from './Category'
import PostAd from './PostAd'
import Cart from './Cart'
import AdDetailsPage from './AdDetailsPage'
import Checkout from './Checkout'
import AdvertisementsFiltered from './AdvertisementsFiltered';
import Msg from './Msg'
import SellerProfile from './SellerProfile'
import UserDetails from './UserDetails'
import AdminUProf from './AdminUProf';
import MyAds from './MyAds';



function PageRoutes() {

  const state = useContext(GlobalState)

  const [isLogged, setIsLogged] = state.UserAPI.isLogged
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin

  return (
    <Routes>

      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/" exact element={isAdmin ? <AdminHomepage /> : <Advertisements />} />
      <Route path="/:slug" exact element={isAdmin ? <AdminHomepage /> : <Advertisements />} />
      <Route path="/users" exact element={<Users />} />
      <Route path="/orders" exact element={<Orders />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/category" exact element={<Category />} />
      <Route path="/category" exact element={<Category />} />
      <Route path='/ad/:id' exact element={<AdDetailsPage />} />
      <Route path="/post_ad" exact element={isLogged && !isAdmin ? <PostAd /> : <Navigate to='/login' />} />
      <Route path="/edit_ad/:id" exact element={isLogged && !isAdmin ? <PostAd /> : null} />
      <Route path="/userdetails" exact element={<UserDetails />} />
      <Route path="/sellerprofile" exact element={<SellerProfile />} />
      <Route path="/adminuprof/:id" exact element={<AdminUProf />} />
      <Route path="/my_ads" exact element={<MyAds />} />
    </Routes>
  )
}

export default PageRoutes