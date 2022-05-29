import React, { useState, useContext, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'
import Title from '../utilities/Title'
import '../UI/Cart.css'



function Cart() {

  const state = useContext(GlobalState)
  const [user] = state.UserAPI.user
  const [token] = state.UserAPI.token
  const [userCartDetails, setUserCart,Details] = useState([])
    
  
  useEffect(() => {
  
},[])

  if (user.cart.length === 0) return ('Cart Empty')
  else if (userCartDetails.length ===0) return null

  return (
    <div>Cart</div>
  )
}

export default Cart