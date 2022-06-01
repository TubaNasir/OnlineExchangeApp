import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Title from '../utilities/Title'
import '../UI/Cart.css'
import AdDetails from './AdDetails'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'



function Cart() {

  const state = useContext(GlobalState)
  const [user] = state.UserAPI.user
  const [cart] = state.UserAPI.cart
  const [token] = state.UserAPI.token
  const [userCartDetails, setUserCartDetails]= state.UserAPI.userCartDetails
  const [allAdvertisements] = state.AdvertisementAPI.allAdvertisements
  const [total, setTotal] = useState(0)
    
  
  useEffect(() => {
{
  setUserCartDetails([])
    const add = async () => {
      cart.forEach( (c) =>{
        allAdvertisements.forEach( (add) => {
        if(c === add._id){
            setUserCartDetails(userCartDetails => [...userCartDetails, add])

        }
      
    })})
  }
 
    add()
}  
},[cart])

useEffect(() => {
  if(cart.length!==0){
    const getTotal = () => {
    const total = userCartDetails.reduce((prev, item) => {
        return prev + (item.price)
    }, 0)

    setTotal(total)
  }
    getTotal()
  }
  

},[userCartDetails])

  if (cart?.length === 0) return ('Cart Empty')

  if (userCartDetails.length === 0) return null

console.log(userCartDetails)
  return (
    <div>
      <Title title='My Cart' />
      <Container >
          <Col md={{ span: 8, offset: 2 }}>
            {
                userCartDetails.map(advertisement => {
                    return (<ul className='list'>
                <AdDetails key={advertisement._id} advertisement={advertisement} del={true} tag={true}/></ul>)
                })
            }     

            <div className='total_div'>
              <span>Total: </span>
              <span>Rs. {total}</span>
            </div>

            <Link to={{ pathname: "/checkout"}}><div className='cartt'>
                            <button className='cart_buttonn'>
                                <span>Checkout</span>
                            </button>
                    </div></Link>
        </Col>
        </Container>
    </div>
  )
}

export default Cart