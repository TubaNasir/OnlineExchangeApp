import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { registerAPI } from '../../api/UserAPI';



function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: '', gender: '', contact: '', city: '', province: '', role: 2, image: ''
    })



    console.log(user.name, user.email, user.password, user.gender, user.contact, user.city, user.province, user.role)

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const Sindh = ['Badin', 'Bhirkan', 'Rajo Khanani', 'Chak,Dadu', 'Digri', 'Diplo', 'Dokri', 'Ghotki', 'Haala', 'Hyderabad', 'Islamkot', 'Jacobabad', 'Jamshoro', 'Jungshahi', 'Kandhkot', 'Kandiaro', 'Karachi', 'Kashmore', 'Keti Bandar', 'Khairpur', 'Kotri', 'Larkana', 'Matiari', 'Mehar', 'Mirpur Khas', 'Mithani', 'Mithi', 'Mehrabpur', 'Moro', 'Nagarparkar', 'Naudero', 'Naushahro Feroze', 'Naushara', 'Nawabshah', 'Nazimabad', 'Qambar', 'Qasimabad', 'Ranipur', 'Ratodero', 'Rohri', 'Sakrand', 'Sanghar', 'Shahbandar', 'Shahdadkot', 'Shahdadpur', 'Shahpur Chakar', 'Shikarpaur', 'Sukkur', 'Tangwani', 'Tando Adam Khan', 'Tando Allahyar', 'Tando Muhammad Khan', 'Thatta', 'Umerkot', 'Warah']

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

                        <div className='Col-sm-12'>

                            <div className='form-group col-md-6 mb-3'>
                                <label className='mb-2'>Province</label>
                                <select name='province' className='form-control' value={user.province} onChange={onChangeInput} >

                                    <option>--Select a Province--</option>
                                    <option>Sindh</option>
                                    <option>Punjab</option>
                                    <option>Balochistan</option>
                                    <option>KPK</option>
                                </select>

                            </div>

                            <div className='form-group col-md-6 mb-3'>
                                <label className='mb-2'>City</label>
                                <select name='city' className='form-control' value={user.city} onChange={onChangeInput} placeholder='select'>
                                    <option hidden>--Select a City--</option>
                                    <option>Karachi</option>
                                    <option>Lahore</option>
                                    <option>Islamabad</option>
                                    <option>Hyderabad</option>
                                    <option>Multan</option>
                                    <option>Peshawar</option>
                                    <option>Quetta</option>
                                    <option>Sukkar</option>
                                </select>
                            </div>


                        </div>




                        <div className='col-md-8 form-group mb-3'>
                            <label>Image</label>
                            <input type="file" name='image' value={user.image} onChange={onChangeInput} className='form-control form-group' />
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