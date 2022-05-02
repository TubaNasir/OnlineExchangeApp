import React,{useState,useContext} from 'react'
import { Button, FormGroup } from 'react-bootstrap';
import {postAdAPI} from '../../api/AdvertisementAPI';
import { GlobalState } from '../../GlobalState'
var FormData = require('form-data');


function PostAd() {
    const state = useContext(GlobalState)
    const [token] = state.UserAPI.token
    const [ad, setAd] = useState({
        name: '', description: '', price: '', file1: [], file2: []
    })

    console.log(ad)

      const handleChangeSingle = (name) => (e) => {
        const value = name === "file1" ? e.target.files : e.target.value;
        setAd({ ...ad, [name]: value });
      };

      const handleChangeMultiple = (name) => (e) => {
        const value = name === "file2" ? e.target.files : e.target.value;
        setAd({ ...ad, [name]: value });
      };
      const handleSubmit =()=> {
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
        <div></div>
        <input type='file'  name='file1' required  accept='image/*' onChange={handleChangeSingle("file1")}></input>
        <input type='file' name='file2' required multiple accept='image/*' onChange={handleChangeMultiple("file2")}></input>

        <FormGroup>
            <Button onClick={handleSubmit}>
                POST AD
            </Button>
        </FormGroup>
    </div>
  )
}

export default PostAd