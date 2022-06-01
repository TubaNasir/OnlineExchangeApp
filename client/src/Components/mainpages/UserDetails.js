import React, { useState, useEffect, useContext, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import AdDetails from './AdDetails'
import Title from '../utilities/Title'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AdminUProf from './AdminUProf'
/* 
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}; */

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCells: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)

    }
}));


function UserDetails() {
    const i = 1;
    const state = useContext(GlobalState)
    const [allUsers, setAllUsers] = state.UserAPI.allUsers

    var columns = [
        { headerName: "Name", field: "name" },
        { headerName: "Email", field: "email" },
        { headerName: "Location", field: "location" },
    ]

    const classes = useStyles();

    return (

        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label='data table' customHeader={[TableHead]}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCells} >Full Name</TableCell>
                        <TableCell className={classes.tableHeaderCells} >Email</TableCell>
                        <TableCell className={classes.tableHeaderCells} >Gender</TableCell>
                        <TableCell className={classes.tableHeaderCells} >Location</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allUsers.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell><Link id="user" to={`/adminuprof/${user._id}`}>{user.name}</Link></TableCell>
                                <TableCell>{user.email}</TableCell>
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