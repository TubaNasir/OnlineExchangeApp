import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Advertisements from './Advertisements'
import Users from './Users'
import Orders from './Orders'
import Complaints from './Complaints'
import AdminHomepage from './AdminHomepage'
import Profile from './Profile'
import Category from './Category'
import AdvertisementsFiltered from './AdvertisementsFiltered';
import Msg from './Msg'



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
      <Route path="/complaints" exact element={<Complaints />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/category" exact element={<Category />} />
      <Route path="/msg" exact element={<Msg />} />
    </Routes>
  )
}

export default PageRoutes