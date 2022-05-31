import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'
import UserDetails from './UserDetails'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'

function Users() {
  const state = useContext(GlobalState)
  const [allUsers, setAllUsers] = state.UserAPI.allUsers

  return (
    <div>
      <Col className="products">
        {
          /* allUsers.map(user => {
            return (<Link id="user" to={`/profile}`}><ul className='list'>
              <UserDetails key={user._id} user={user} /></ul></Link>)
          }) */
        }


      </Col>
    </div>
  )
}

export default Users