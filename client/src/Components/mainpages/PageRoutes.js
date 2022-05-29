import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState'
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
import {Routes, Route, Link,Navigate} from 'react-router-dom';
//import PrivateRoute from './PrivateRoute.ts';
>>>>>>> 7bf59b51e3cde78b04ab248bae3c2b7ebb65fdb0
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
import AdDetailsPage from './AdDetailsPage'
import AdvertisementsFiltered from './AdvertisementsFiltered';
import Msg from './Msg'



function PageRoutes() {

  const state = useContext(GlobalState)

  const [isLogged, setIsLogged] = state.UserAPI.isLogged
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin

  return (
    <Routes>
<<<<<<< HEAD

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
=======
        
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/" exact element={isAdmin ? <AdminHomepage/> : <Advertisements/>}/>
        <Route path="/:slug" exact element={isAdmin ? <AdminHomepage/> : <Advertisements/>}/>
        <Route path="/users" exact element={<Users/>}/>
        <Route path="/orders" exact element={<Orders/>}/>
        <Route path="/complaints" exact element={<Complaints/>}/>
        <Route path="/profile" exact element={<Profile/>}/>
        <Route path="/category" exact element={<Category/>}/>
        <Route path="/category" exact element={<Category/>}/>
        <Route path='/ad/:id' exact element={<AdDetailsPage/>}/>
        <Route path="/post_ad" exact element={isLogged && !isAdmin ?  <PostAd/> : <Navigate to='/login'/>}/>
        <Route path="/edit_ad/:id" exact element={isLogged && !isAdmin ?  <PostAd/> : null}/>
>>>>>>> 7bf59b51e3cde78b04ab248bae3c2b7ebb65fdb0
    </Routes>
  )
}

export default PageRoutes