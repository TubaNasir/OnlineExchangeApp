import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'


function UserDetails() {
    const i = 1;
    const state = useContext(GlobalState)
    const [allUsers, setAllUsers] = state.UserAPI.allUsers

    return (

        <TableContainer component={Paper}>
            <Table aria-label='data table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allUsers.map((user) => (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell><Link to='/sellerprofile'>{user.name}</Link></TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.city}, {user.province}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>


    )
}

export default UserDetails