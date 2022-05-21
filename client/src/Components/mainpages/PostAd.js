import React, { useState, useContext, useEffect } from 'react'
import { postAdAPI } from '../../api/AdvertisementAPI';
import { GlobalState } from '../../GlobalState'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import Title from '../utilities/Title'
import { IoIosImage } from 'react-icons/io'
import {MdLocationOn, MdAttachMoney} from 'react-icons/md'
import '../UI/PostAd.css'
var FormData = require('form-data');


function PostAd() {
  const state = useContext(GlobalState)
  const [categories] = state.CategoryAPI.categories
  const [token] = state.UserAPI.token
  const [ad, setAd] = useState({
    name: null, description: null, price: null, file1: [], file2: [], categoryID: null, city: null, province: null, area: null
  })
  const [cat, setCat] = useState({
    mainCat: [],
    subCat: [],
    subSubCat: [],
    selectedMainCat: '',
    selectedSubCat: '',
    selectedSubSubCat: ''
  });

  const [location, setLocation] = useState({
    provinces: [],
    cities: [],
    selectedProvince: '',
    selectedCity: ''
  });


  // console.log(ad)
  const onChangeInput = e => {
    const { name, value } = e.target;
    setAd({ ...ad, [name]: value })
  }
  const Sindh = ['Badin','Bhirkan','Rajo Khanani', 'Chak,Dadu','Digri','Diplo','Dokri','Ghotki','Haala','Hyderabad','Islamkot','Jacobabad','Jamshoro','Jungshahi','Kandhkot','Kandiaro','Karachi','Kashmore','Keti Bandar','Khairpur','Kotri','Larkana','Matiari','Mehar','Mirpur Khas','Mithani','Mithi','Mehrabpur','Moro','Nagarparkar','Naudero','Naushahro Feroze','Naushara','Nawabshah','Nazimabad','Qambar','Qasimabad','Ranipur','Ratodero','Rohri','Sakrand','Sanghar','Shahbandar','Shahdadkot','Shahdadpur','Shahpur Chakar', 'Shikarpaur','Sukkur','Tangwani','Tando Adam Khan','Tando Allahyar','Tando Muhammad Khan','Thatta','Umerkot','Warah']
 const updateLocation = newLocation => {
    setLocation({ ...location, ...newLocation });
  };
  const changeProvince = event => {
    if (event.target.value === '') {
      updateLocation({
        selectedProvince: '',
        cities: []
      })
      setAd({...ad, province: null})
    }
    else {
      updateLocation({
        selectedProvince: event.target.value,
        cities: location.provinces.find(p => p.name === event.target.value).cities
      });

      setAd({...ad, province: event.target.value})
    }

  };

  const changeCity = event => {
    if (event.target.value === '') {
      updateLocation({ selectedCity: '' })
      setAd({...ad, city: null})
    } else {
      updateLocation({ selectedCity: event.target.value })
      setAd({...ad, city: event.targey.value})
    }
  }


 
/* [{name: "Karachi"},{name: "Hyderabad"}] */
  const categoryDropdown = () => {
    var mcat = []
    var scatArr = []
    var sscatArr = [];
    categories.map(async (cat) => {
      if (cat.children) {
        cat.children.map(scat => {
          if (scat.children) {
            scat.children.map(sscat => {
              console.log(sscat._id)
              sscatArr.push({ name: sscat.name, id: sscat._id })
            })
          scatArr.push({ name: scat.name, subSubCat: sscatArr })
          sscatArr =[]
        }
          
        })
        mcat.push({ name: cat.name, subCat: scatArr })

        scatArr = []
        sscatArr = [];
      }
    })
    //const c1 = Promise.all(promise1)
    return mcat;
  }

  const updateCat = newCat => {
    setCat({ ...cat, ...newCat });
  };

  const changeMainCategory = event => {
    setAd({ ...ad, categoryID: null })
    updateCat({
      selectedSubCat: '',
      selectedSubSubCat: ''
    })
    if (event.target.value === '') {
      updateCat({
        selectedMainCat: '',
        subCat: []
      })
      
    }
    else {
      updateCat({
        selectedMainCat: event.target.value,
        subCat: cat.mainCat.find(p => p.name === event.target.value).subCat
      });

    }

  };

  const changeSubCategory = event => {
    setAd({ ...ad, categoryID: null })
    updateCat({
      selectedSubSubCat: ''
    })
    if (event.target.value === '') {

      updateCat({
        selectedSubCat: '',
        subSubCat: []
      })
      //setProvince('')
    }
    else {

      updateCat({
        selectedSubCat: event.target.value,
        subSubCat: cat.subCat.find(p => p.name === event.target.value).subSubCat
      });
      console.log(cat.subSubCat)
      //setProvince('province=' + event.target.value)
    }

  };

  const changeSubSubCategory = event => {
    if (event.target.value === '') {
      console.log('in')
      updateCat({selectedSubSubCat: ''})
    }
    else {
      updateCat({selectedSubSubCat: event.target.value});
    }
  };

  console.log(ad)
  useEffect(() => {
    setCat(prevState => ({
      ...prevState,
      mainCat: categoryDropdown()
    }))
    setLocation(prevState => ({
      ...prevState,
      provinces: [{name: "Sindh",cities: [{name:'Badin'},{name:'Bhirkan'},{name:'Rajo Khanani'},{name: 'Chak'},{name:'Dadu'},{name:'Digri'},{name:'Diplo'},{name:'Dokri'},{name:'Ghotki'},{name:'Haala'},{name:'Hyderabad'},{name:'Islamkot'},{name:'Jacobabad'},{name:'Jamshoro'},{name:'Jungshahi'},{name:'Kandhkot'},{name:'Kandiaro'},{name:'Karachi'},{name:'Kashmore'},{name:'Keti Bandar'},{name:'Khairpur'},{name:'Kotri'},{name:'Larkana'},{name:'Matiari'},{name:'Mehar'},{name:'Mirpur Khas'},{name:'Mithani'},{name:'Mithi'},{name:'Mehrabpur'},{name:'Moro'},{name:'Nagarparkar'},{name:'Naudero'},{name:'Naushahro Feroze'},{name:'Naushara'},{name:'Nawabshah'},{name:'Nazimabad'},{name:'Qambar'},{name:'Qasimabad'},{name:'Ranipur'},{name:'Ratodero'},{name:'Rohri'},{name:'Sakrand'},{name:'Sanghar'},{name:'Shahbandar'},{name:'Shahdadkot'},{name:'Shahdadpur'},{name:'Shahpur Chakar'},{name: 'Shikarpaur'},{name:'Sukkur'},{name:'Tangwani'},{name:'Tando Adam Khan'},{name:'Tando Allahyar'},{name:'Tando Muhammad Khan'},{name:'Thatta'},{name:'Umerkot'},{name:'Warah'}]},
      {name: "Punjab",cities: [{name: "Lahore"},{name: "Multan"}]}],
    }))
  }, [categories])

  useEffect(() => {
    console.log(cat.selectedSubSubCat)
    if (cat.selectedSubSubCat== '') {setAd({ ...ad, categoryID: null })}
    else {
      setAd({ ...ad, categoryID: cat.subSubCat.find(p => p.name === cat.selectedSubSubCat).id })}
  },[cat.selectedSubSubCat])

  const handleChangeSingle = (name) => (e) => {
    const value = name === "file1" ? e.target.files : e.target.value;
    setAd({ ...ad, [name]: value });
  };

  const handleChangeMultiple = (name) => (e) => {
    const value = name === "file2" ? e.target.files : e.target.value;
    setAd({ ...ad, [name]: value });
  };
  const handleSubmit = () => {
    let formdata = new FormData();
    formdata.append('name', 'name');
    formdata.append('file1', ad.file1[0]);
    for (let i = 0; i < ad.file2.length; i++) {
      formdata.append(`file2`, ad.file2[i])
    }

    postAdAPI(formdata, token)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data.error.msg)
      })

  }
  return (
    <div>
      <Title title="Post Advertisement" />
      <Container >
        <form>
          <Col md={{ span: 8, offset: 2 }}>
            <Row>
              <label className='mainLabel'><IoIosImage />Details</label>
              <Row>
                <label className='subLabel'>Name</label>
                <input type='text'
                  placeholder='Name'
                  name='name'
                  value={ad.name}
                  required
                  onChange={onChangeInput}
                  className='form-control form-group' />
              </Row>
              <Row>
                <label className='subLabel'>Description</label>
                <textarea type='text'
                  rows='10'
                  placeholder=''
                  name='description'
                  value={ad.description}
                  required
                  onChange={onChangeInput}
                  className='form-control form-group' />
              </Row>
            </Row>

            <Row>
              <label className='mainLabel'><MdAttachMoney />Price</label>
              <Row>
                <input type='number'
                  placeholder='Price'
                  name='price'
                  value={ad.price}
                  required
                  onChange={onChangeInput}
                  className='form-control form-group' />
              </Row>
            </Row>

            <Row><label className='mainLabel'>Category</label>
              <Row>
                <label className='subLabel'>Main Category</label>
                <select className="form-select" placeholder="Main Category" value={cat.selectedMainCat} required onChange={changeMainCategory}>
                  <option className='option' value=''>-Select Main Category-</option>
                  {cat.mainCat.map((c, key) => {
                    return <option className='option' key={key} value={c.name}>{c.name}</option>;
                  })}
                </select>
              </Row>
              <Row>
                <label className='subLabel'>Sub Category</label>
                <select className="form-select" placeholder="Sub Category" value={cat.selectedSubCat} required onChange={changeSubCategory}>
                  <option className='option' value=''>Select Sub Category</option>
                  {cat.subCat.map((c, key) => {
                    return <option className='option' key={key} value={c.name}>{c.name}</option>;
                  })}
                </select>
              </Row>
              <Row>
                <label className='subLabel'>Category Types</label>
                <select className="form-select" placeholder="Category Type" value={cat.selectedSubSubCat} required onChange={changeSubSubCategory}>
                  <option className='option' value='' >Select Category Type</option>
                  {cat.subSubCat.map((c, key) => {
                    return <option className='option' key={key} value={c.name}>{c.name}</option>;
                  })}
                </select>
              </Row>
            </Row>

            <Row>
              <label className='mainLabel'><MdLocationOn />Location</label>
              
              <Row>
                <label className='subLabel'>Area</label>
                <textarea type='text'
                  rows='3'
                  placeholder=''
                  name='area'
                  value={ad.area}
                  required
                  onChange={onChangeInput}
                  className='form-control form-group' />
              </Row>
              <Row>
              <Col>
              <div className="form-group">
          <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Province</label>
          <select className="form-select" placeholder="Province" value={location.selectedProvince} required onChange={changeProvince}>
            <option className='option' value=''>All</option>
            {location.provinces.map((c, key) => {
              return <option className='option' key={key} value={c.name}>{c.name}</option>;
            })}
          </select>
        </div>
              </Col>
              <Col>
              <div className="form-group">
          <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>City</label>
          <select className="form-select" placeholder="City" value={location.selectedCity} required onChange={changeCity}>
            <option className='option' value=''>All</option>
            {location.cities.map((e, key) => {
              return <option className='option' key={key} value={e.name}>{e.name}</option>;
            })}
          </select>
        </div>
              </Col>
              </Row>
            </Row>
            <Row>
              <label className='mainLabel'><IoIosImage />  Images</label>

              <Row>
                <label className='subLabel'>Cover Image</label>
                <input type='file' name='file1' required accept='image/*' onChange={handleChangeSingle("file1")}></input>
              </Row>
              <Row>
                <label className='subLabel'>Additional Images</label>
                <input type='file' name='file2'  multiple accept='image/*' onChange={handleChangeMultiple("file2")}></input>
              </Row>
            </Row>


            <hr
              style={{
                backgroundColor: 'dimgrey',
                height: 3,
                margin: '30px 0'
              }}
            />
            <Button type='submit'
                        className='btn  btn-block'
                        variant = 'primary'
                        value='Submit' onClick={handleSubmit}>
            POST AD
          </Button>
          </Col>
        </form>
      </Container>



    </div>
  )
}

export default PostAd