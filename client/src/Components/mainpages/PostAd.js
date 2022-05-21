import React, { useState, useContext, useEffect } from 'react'
import { postAdAPI } from '../../api/AdvertisementAPI';
import { GlobalState } from '../../GlobalState'
import { Container, Row, Col, Modal, Button, FormGroup } from 'react-bootstrap'
import Title from '../utilities/Title'
import '../UI/PostAd.css'
var FormData = require('form-data');


function PostAd() {
  const state = useContext(GlobalState)
  const [categories] = state.CategoryAPI.categories
  const [token] = state.UserAPI.token
  const [ad, setAd] = useState({
    name: '', description: '', price: '', file1: [], file2: []
  })
  const [cat, setCat] = useState({
    mainCat: [],
    subCat: [],
    subSubCat: [],
    selectedMainCat: '',
    selectedSubCat: '',
    selectedSubSubCat: ''
  });

  console.log(ad)

  const categoryDropdown = () => {
    var mcat=[]
    var scatArr=[]
    var sscatArr=[];
    categories.map(async (cat) => {
        if (cat.children) {
          cat.children.map(scat => {
            scatArr.push({ name: scat.name })
            if (scat.children) {
              scat.children.map(sscat => {
                  sscatArr.push({ name: sscat.name })
              })
            }
          })
        mcat.push({name:cat.name, subCat: scatArr, subSubCat: sscatArr})
        
        scatArr=[]
        sscatArr=[];
        }
      })
      //const c1 = Promise.all(promise1)
      return mcat;
  }

  console.log(categoryDropdown())

  const updateCat = newCat => {
    setCat({ ...cat, ...newCat });
  };

  const changeMainCategory = event => {
    if (event.target.value === '') {
      updateCat({
        selectedMainCat: '',
        subCat: []
      })
      //setProvince('')
    }
    else {
      updateCat({
        selectedMainCat: event.target.value,
        subCat: cat.mainCat.find(p => p.name === event.target.value).subCat
      });

      //setProvince('province=' + event.target.value)
    }

  };

  const changeSubCategory = event => {
    console.log(event.target.value)
    if (event.target.value === '') {
      console.log("in")

      updateCat({
        selectedSubCat: '',
        subSubCat: []
      })
      //setProvince('')
    }
    else {
      console.log("inn")

      updateCat({
        selectedSubCat: event.target.value,
        subSubCat: cat.subCat.find(p => p.name === event.target.value).subSubCat
      });

      //setProvince('province=' + event.target.value)
    }

  };

  const changeSubSubCategory = event => {
    if (event.target.value === '') {
      updateCat({
        selectedSubSubCat: ''
      })
      //setProvince('')
    }
    else {
      updateCat({
        selectedSubSubCat: event.target.value
      });

      //setProvince('province=' + event.target.value)
    }

  };

  useEffect(() => {
    setCat(prevState => ({
      ...prevState,
      mainCat: categoryDropdown()
    }))

  },[categories])

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
      <Container>

        <Row><label className='mainLabel'>Category</label>
          <Row>
            <label className='subLabel'>Main Category</label>
            <select className="form-select" placeholder="Main Category" value={cat.selectedMainCat} onChange={changeMainCategory}>
              <option className='option' value=''>-Select Main Category-</option>
              {cat.mainCat.map((c, key) => {
                return <option className='option' key={key} value={c.name}>{c.name}</option>;
              })}
            </select>
          </Row>
          <Row>
          <label className='subLabel'>Sub Category</label>
            <select className="form-select" placeholder="Sub Category" value={cat.selectedSubCat} onChange={changeSubCategory}>
              <option className='option' value=''>Select Sub Category</option>
              {cat.subCat.map((c, key) => {
                return <option className='option' key={key} value={c.name}>{c.name}</option>;
              })}
            </select>
          </Row>
          <Row>
          <label className='subLabel'>Category Types</label>
            <select className="form-select" placeholder="Category Type" value={cat.selectedSubSubCat} onChange={changeSubSubCategory}>
              <option className='option' value=''>Select Category Type</option>
              {cat.subSubCat.map((c, key) => {
                return <option className='option' key={key} value={c.name}>{c.name}</option>;
              })}
            </select>
          </Row>
        </Row>
        <Row>
          <label className='mainLabel'>Images</label>


          <Row>
            <label className='subLabel'>Cover Image</label>
            <input type='file' name='file1' required accept='image/*' onChange={handleChangeSingle("file1")}></input>
          </Row>
          <Row>
            <label className='subLabel'>Additional Images</label>
            <input type='file' name='file2' required multiple accept='image/*' onChange={handleChangeMultiple("file2")}></input>
          </Row>
        </Row>

        <hr
          style={{
            backgroundColor: 'dimgrey',
            height: 3,
            margin: '30px 0'
          }}
        />

      </Container>

      <FormGroup>
        <Button onClick={handleSubmit}>
          POST AD
        </Button>
      </FormGroup>
    </div>
  )
}

export default PostAd