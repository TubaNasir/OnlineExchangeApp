import { GlobalState } from '../../GlobalState'
import React, { useContext, useState } from 'react'
import {Navigate,  useLocation } from 'react-router-dom'
const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.UserAPI.isLogged  
  const { children } = props
    const isLoggedIn: boolean = isLogged!== null;
    const location = useLocation()
  
    return isLoggedIn ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }