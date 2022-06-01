import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'
import UserDetails from './UserDetails'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'

function AdminUProf() {

    const state = useContext(GlobalState)
    const allUsers = state.UserAPI.allUsers
    const [params, setParams] = useParams()

    return (
        <div>
            {
                allUsers.map(user => {
                    if (user._id === params._id)
                        <div>{user.name}</div>
                })
            }
        </div>
    )

}

export default AdminUProf