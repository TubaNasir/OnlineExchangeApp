import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { registerAPI } from '../../api/UserAPI';



function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: '', gender: '', contact: '', city: '', province: '', role: 2
    })

    console.log(user.name, user.email, user.password, user.gender, user.contact, user.city, user.province, user.role)

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        registerAPI({ ...user })
            .then(res => {
                console.log(res.data)
                alert('Registered Successfully')
                window.location.href = '/login'
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error.msg)
            })

    }

    return (
        <div className='container col-md-6'  >
            <div className='card mt-4'>

                <div className="card-header">
                    <h4>Register</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={registerSubmit}>
                        <div className='form-group mb-3'>
                            <text>
                                Full Name
                            </text>
                            <input type='text'
                                name='name'
                                value={user.name}
                                required
                                onChange={onChangeInput}
                                className='form-control' />
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                Email
                            </text>
                            <input type='text'
                                name='email'
                                value={user.email}
                                required
                                onChange={onChangeInput}
                                className='form-control' />
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                Password
                            </text>
                            <input type='password'
                                //placeholder='Password'
                                name='password'
                                value={user.password}
                                required
                                onChange={onChangeInput}
                                className='form-control form-group' />
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                Gender
                            </text>

                            <div className="form-check form-check-inline">
                                <input type="radio"
                                    id="gender1"
                                    name='gender'
                                    value='male'
                                    onChange={onChangeInput}
                                    className='form-check-input' />
                                <label className="form-check-label" htmlFor="gender1">Male</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="radio"
                                    id="gender2"
                                    name='gender'
                                    value='female'
                                    onChange={onChangeInput}
                                    className='form-check-input' />
                                <label className="form-check-label" htmlFor="gender2">Female</label>
                            </div>
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                Contact
                            </text>
                            <input type='number'
                                //placeholder='Contact'
                                name='contact'
                                value={user.contact}
                                required
                                onChange={onChangeInput}
                                className='form-control form-group' />
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                City
                            </text>
                            <input type='text'
                                //placeholder='City'
                                name='city'
                                value={user.city}
                                required
                                onChange={onChangeInput}
                                className='form-control form-group' />
                        </div>

                        <div className='form-group mb-3'>
                            <text>
                                Province
                            </text>
                            <input type='text'
                                //placeholder='Province'
                                name='province'
                                value={user.province}
                                required
                                onChange={onChangeInput}
                                className='form-control form-group' />
                        </div>

                        <div className='row'>
                            <div className='col-md-8 form-group mb-3'>
                                <label>Image</label>
                                <input type="file" name='image' value={user.image} onChange={onChangeInput} className='form-control form-group' />
                            </div>
                        </div>

                        <div className='form-group mb-3'>
                            <button type='submit'
                                className='btn btn-danger px-4 mt-2'
                                value='Submit'>Register
                            </button>
                        </div>
                    </form>


                    <text className="text-muted " >
                        Already have an account?
                    </text>
                    <a href="/login" class="btn btn-outline-secondary btn-sm" role="button" aria-pressed="true">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Register