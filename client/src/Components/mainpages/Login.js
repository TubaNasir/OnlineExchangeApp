import React, { useState, useContext } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css'
import { loginAPI } from '../../api/UserAPI';

function Login() {
    
    const state = useContext(GlobalState)
    
    const [token, setToken] = state.UserAPI.token


    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
            loginAPI({...user})
            .then(res => {
                console.log(res.data)
                localStorage.setItem('firstLogin', true)
                alert("Logged in successfully")  
                setToken(res.data.data.accessToken)      
                window.location.href = '/'
                })
            .catch(err =>  {
                console.log(err.response.data)
                alert(err.response.data.error.msg)})
        }
        
            
      
            //window.location.href = '/'

    

    return (

        
        <div className='container col-md-6' style={{marginTop:'50px'}}>
            <div className='form-div'>
                <div className='title'>Login</div>

                <form onSubmit={loginSubmit}>
                    <input type='text'
                        placeholder='Email'
                        name='email'
                        value={user.email}
                        required
                        onChange={onChangeInput}
                        className='form-control form-group' />

                    <input type='password'
                        placeholder='Password'
                        name='password'
                        value={user.password}
                        required
                        onChange={onChangeInput}
                        className='form-control form-group' />

                    <button type='submit'
                        className='btn btn-danger btn-block'
                        variant = 'primary'
                        value='Submit'>Submit
                        </button>
                    

                        
                </form>
                <div className="text-muted " >
                                Don't have an account?  
                        </div>
                        <a href="/register" className="btn btn-outline-secondary btn-sm" role="button" aria-pressed="true">Register</a>

            </div>
        </div>
    )
}

export default Login