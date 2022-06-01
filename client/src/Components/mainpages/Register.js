import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { registerAPI } from '../../api/UserAPI';
var FormData = require('form-data');



function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: '', gender: '', contact: '', city: '', province: '', role: 2, file1: ''
    })

    const [location, setLocation] = useState({
        provinces: [],
        cities: [],
        selectedProvince: '',
        selectedCity: ''
      });

      const updateLocation = newLocation => {
        setLocation({ ...location, ...newLocation });
      };
    const changeProvince = event => {
        if (event.target.value === '') {
          updateLocation({
            selectedProvince: '',
            cities: []
          })
          setUser({ ...user, province: '' })
        }
        else {
          updateLocation({
            selectedProvince: event.target.value,
            cities: location.provinces.find(p => p.name === event.target.value).cities
          });
    
          setUser({ ...user, province: event.target.value })
        }
    
      };
    
      const changeCity = event => {
        if (event.target.value === '') {
          updateLocation({ selectedCity: '' })
          setUser({ ...user, city: '' })
        } else {
          updateLocation({ selectedCity: event.target.value })
          setUser({ ...user, city: event.target.value })
        }
      }
    

    console.log(user.name, user.email, user.password, user.gender, user.contact, user.city, user.province, user.role)

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const handleChangeSingle = (name) => (e) => {
        const value = name === "file1" ? e.target.files : e.target.value;
        setUser({ ...user, [name]: value });
       
      };
    const Sindh = ['Badin', 'Bhirkan', 'Rajo Khanani', 'Chak,Dadu', 'Digri', 'Diplo', 'Dokri', 'Ghotki', 'Haala', 'Hyderabad', 'Islamkot', 'Jacobabad', 'Jamshoro', 'Jungshahi', 'Kandhkot', 'Kandiaro', 'Karachi', 'Kashmore', 'Keti Bandar', 'Khairpur', 'Kotri', 'Larkana', 'Matiari', 'Mehar', 'Mirpur Khas', 'Mithani', 'Mithi', 'Mehrabpur', 'Moro', 'Nagarparkar', 'Naudero', 'Naushahro Feroze', 'Naushara', 'Nawabshah', 'Nazimabad', 'Qambar', 'Qasimabad', 'Ranipur', 'Ratodero', 'Rohri', 'Sakrand', 'Sanghar', 'Shahbandar', 'Shahdadkot', 'Shahdadpur', 'Shahpur Chakar', 'Shikarpaur', 'Sukkur', 'Tangwani', 'Tando Adam Khan', 'Tando Allahyar', 'Tando Muhammad Khan', 'Thatta', 'Umerkot', 'Warah']

    const registerSubmit = async e => {
        e.preventDefault()
        e.preventDefault()
        let formdata = new FormData();
        formdata.append('name', user.name)
        formdata.append('email', user.email)
        formdata.append('password', user.password)
        formdata.append('gender', user.gender)
        formdata.append('contact', user.contact)
        formdata.append('area', user.area)
        formdata.append('city', user.city)
        formdata.append('province', user.province)
        formdata.append('role', user.role)
        formdata.append('file1', user.file1[0]);
        registerAPI(formdata)
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


    useEffect(() => {
        setLocation(prevState => ({
            ...prevState,
            provinces: [{ name: "Sindh", cities: [{ name: 'Badin' }, { name: 'Bhirkan' }, { name: 'Rajo Khanani' }, { name: 'Chak' }, { name: 'Dadu' }, { name: 'Digri' }, { name: 'Diplo' }, { name: 'Dokri' }, { name: 'Ghotki' }, { name: 'Haala' }, { name: 'Hyderabad' }, { name: 'Islamkot' }, { name: 'Jacobabad' }, { name: 'Jamshoro' }, { name: 'Jungshahi' }, { name: 'Kandhkot' }, { name: 'Kandiaro' }, { name: 'Karachi' }, { name: 'Kashmore' }, { name: 'Keti Bandar' }, { name: 'Khairpur' }, { name: 'Kotri' }, { name: 'Larkana' }, { name: 'Matiari' }, { name: 'Mehar' }, { name: 'Mirpur Khas' }, { name: 'Mithani' }, { name: 'Mithi' }, { name: 'Mehrabpur' }, { name: 'Moro' }, { name: 'Nagarparkar' }, { name: 'Naudero' }, { name: 'Naushahro Feroze' }, { name: 'Naushara' }, { name: 'Nawabshah' }, { name: 'Nazimabad' }, { name: 'Qambar' }, { name: 'Qasimabad' }, { name: 'Ranipur' }, { name: 'Ratodero' }, { name: 'Rohri' }, { name: 'Sakrand' }, { name: 'Sanghar' }, { name: 'Shahbandar' }, { name: 'Shahdadkot' }, { name: 'Shahdadpur' }, { name: 'Shahpur Chakar' }, { name: 'Shikarpaur' }, { name: 'Sukkur' }, { name: 'Tangwani' }, { name: 'Tando Adam Khan' }, { name: 'Tando Allahyar' }, { name: 'Tando Muhammad Khan' }, { name: 'Thatta' }, { name: 'Umerkot' }, { name: 'Warah' }] },
            { name: "Punjab", cities: [{ name: "Lahore" }, { name: "Multan" }] }],
          }))
    }, [])
    
    return (
        <div className='container col-md-6'  >
            <div className='card mt-4'>

                <div className="card-header">
                    <h4 style={{textAlign: 'center'}}>Register</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={registerSubmit}>
                        <div className='form-group mb-3'>
                            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
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
                            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
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
                            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
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
                            <div style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
                                Gender
                            </div>

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
                            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
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
                    <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Province</label>
                    <select className="form-select" placeholder="Province" value={location.selectedProvince} required onChange={changeProvince}>
                      <option className='option' value=''>All</option>
                      {location.provinces.map((c, key) => {
                        return <option className='option' key={key} value={c.name}>{c.name}</option>;
                      })}
                    </select>
                  

                            </div>

                            <div className='form-group col-md-6 mb-3'>
                            <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>City</label>
                    <select className="form-select" placeholder="City" value={location.selectedCity} required onChange={changeCity}>
                      <option className='option' value=''>All</option>
                      {location.cities.map((e, key) => {
                        return <option className='option' key={key} value={e.name}>{e.name}</option>;
                      })}
                    </select>


                        </div>

</div>
                        <div className='col-md-8 form-group mb-3'>
                            <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Image</label>
                            <input type="file" name='file1' value={user.image} onChange={handleChangeSingle("file1")} className='form-control form-group' />
                        </div>


                        <div className='form-group mb-3'>
                            <button type='submit'
                                className='btn btn-danger px-4 mt-2'
                                style={{background:'#eb4605'}}
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