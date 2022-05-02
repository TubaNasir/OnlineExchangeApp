import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Container, Row, Col, Modal, Button, Form} from 'react-bootstrap'
import { uploadImagee, createCategory, updateCategoryAPI, deleteCategoryAPI } from '../../api/CategoryAPI'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { IoIosCheckboxOutline, IoIosCheckbox, IoMdArrowDropdown, IoMdArrowDropright, IoIosAdd, IoMdCreate, IoIosTrash } from "react-icons/io";
import '../UI/Category.css'
const FormData = require('form-data');


function Category() {
    const state = useContext(GlobalState)
    const uploadImageAPI = state.CategoryAPI.uploadImage
    const [categories] = state.CategoryAPI.categories
    const [token] = state.UserAPI.token
console.log(categories)
    const [category, setCategory] = useState({
        name: '', parentId: '', image: ''
    })

    const [callback, setCallback] = state.CategoryAPI.callback

    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    console.log(category)


    const handleEdit = () => {
        checkedArray.forEach((array) => console.log(array))
        checkedArray.forEach((array) =>
            updateCategoryAPI(array, token)
                .then(res => {
                    console.log(res.data)
                    setCallback(!callback)
                })
                .catch(err => {
                    console.log(err.response.data)
                    alert(err.response.data.error.msg)
                }))

        setUpdateShow(false)
    }

    const handleSubmit = () => {
    let formData = new FormData();
      formData.append('image', category.image);
      formData.append('name', category.name);
      formData.append('parentId', category.parentId);

        createCategory(formData, token)
            .then(res => {
                console.log(res.data)
                setCallback(!callback)
            setShow(false)})
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error.msg)
            })
        
    }


    const handleChange = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        setCategory({ ...category, [name]: value });
      };

    const handleDelete = () => {
        checkedArray.forEach((array) =>
            deleteCategoryAPI(array, token)
                .then(res => {
                    console.log(res.data)
                    setCallback(!callback)
                })
                .catch(err => {
                    console.log(err.response.data)
                    alert(err.response.data.error.msg)
                }))

        setDeleteShow(false)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateShow = () => setUpdateShow(true);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const setCategoryModel = () => {

        const cats = createCategoryList(categories)
        const array = []
        checked.length > 0 &&
            checked.forEach((categoryId, index) => {
                const cat = cats.find((category, _index) => categoryId === category.value)
                cat && array.push(cat)
            })
        console.log(checked, array)
        setCheckedArray(array)
    }

    const renderCategories = (categories) => {

        let cat = [];
        for (let category of categories) {
            cat.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return cat;

    }

    const createCategoryList = (categories, list = []) => {
        for (let category of categories) {
            list.push({ value: category._id, name: category.name, parentId: category.parentId})
            if (category.children.length > 0) {
                createCategoryList(category.children, list)
            }
        }
        return list;
    }

    const updateCheckedArray = (index, name, value) => {
        const cArray = checkedArray.map((item, _index) => index === _index ? { ...item, [name]: value } : item)
        setCheckedArray(cArray)
    }


    const renderDelete = (categories) => {
        for (let category of checkedArray) {
            renderDeleteCategoryList(category, categories)
        }
    }
    const renderDeleteCategoryList = (category, categories) => {
        let catList = [];

        categories.map((cat) =>
            category.value === cat._id ?
                catList.push(
                    <li key={cat.name}>
                        {cat.name}
                        {cat.children.length > 0 ?

                            <ul>{renderDeleteCategoryList(cat.children)}</ul> : null}
                    </li>
                ) : null
        )

        return catList;
    }

    const uploadImage = async e => {
        e.preventDefault()

        const file = e.target.files[0]

        let formData = new FormData()
        formData.append('file', file)

        uploadImagee(formData, token)
            .then(res => {
                console.log(res.data)
                setCategory({ ...category, image: res.data.data })
            })
            .catch(err => {
                formData.delete('file')
                console.log(err.response.data)
                document.getElementById("file").value = null;
                alert(err.response.data.error.msg)
            })
    }


    return (<>
        <Container>
            <Row>
                <Col>
                    <div>
                        <h3 style={{marginTop:'15px'}}>Categories</h3>
                        <hr
                            style={{
                                backgroundColor: 'darkgray',
                                height: 3
                            }}
                        />
                        <div className='actionBtnContainer'>

                            <button onClick={handleShow}><IoIosAdd /><span>ADD</span></button>
                            <button onClick={handleUpdateShow}><IoMdCreate /><span>EDIT</span></button>
                            <button onClick={handleDeleteShow}><IoIosTrash /><span>DELETE</span></button>
                        </div>
                        <span className='text'>Select checkboxes to edit or delete categories</span>

                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CheckboxTree 
                        nodes={renderCategories(categories)}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setChecked(checked)}
                        onExpand={expanded => setExpanded(expanded)}
                        icons={{
                            check: <IoIosCheckbox />,
                            uncheck: <IoIosCheckboxOutline />,
                            halfCheck: <IoIosCheckbox />,
                            expandClose: <IoMdArrowDropright />,
                            expandOpen: <IoMdArrowDropdown />
                        }}
                        noCascade
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type='text'
                        placeholder='Category Name'
                        value={category.name}
                        required
                        onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                </Form.Group>
                <br />

                <select className="form-control"
                    value={category.parentId}
                    onChange={(e) => setCategory({ ...category, parentId: e.target.value })}>
                    <option>Select Parent Category</option>
                    {
                        createCategoryList(categories).map(list =>
                            <option key={list.value} value={list.value}>{list.name}</option>)

                    }
                </select>
                <br />
                <input type='file' id='file' name='image' accept='image/*' onChange={handleChange("image")}>
                </input>
                {/* (e) => setCategoryImage(e.target.files[0]) */}
            </Modal.Body>
            <Modal.Footer>
                <Button className='primary-button' onClick={handleSubmit}>
                    DONE
                </Button>
            </Modal.Footer>
        </Modal>


        {/* for update */}

        <Modal show={updateShow} onHide={handleUpdateClose} onShow={setCategoryModel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col><Form.Label>Category Name</Form.Label></Col>
                    <Col><Form.Label>Parent Category</Form.Label></Col>
                    <Col><Form.Label>Image</Form.Label></Col>
                </Row>
                {checkedArray.length > 0 ?
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Form.Group>
                                    <Form.Control type='text'
                                        placeholder='Enter category name'
                                        value={item.name}
                                        required
                                        onChange={(e) => updateCheckedArray(index, 'name', e.target.value)} />
                                </Form.Group>
                                <br />
                            </Col>
                            <Col>
                                <select className="form-control"
                                    value={item.parentId}
                                    onChange={(e) => updateCheckedArray(index, 'parentId', e.target.value)}>

                                    <option >Select Parent Category</option>
                                    {
                                        createCategoryList(categories).map(list =>
                                            <option key={list.value} value={list.value}>{list.name}</option>)

                                    }
                                </select>
                                <br />
                            </Col>
                            <Col>
                                <input className="form-control" type='file' id='file' name='image' onChange={handleChange("image")}></input>
                            </Col>
                        </Row>

                    ) : "No category selected"}
                {/* (e) => setCategoryImage(e.target.files[0]) */}
            </Modal.Body>
            <Modal.Footer>
                <Button className='primary-button' onClick={handleEdit}>
                    DONE
                </Button>
            </Modal.Footer>
        </Modal>

        {/* for delete */}

        <Modal show={deleteShow} onHide={handleDeleteClose} onShow={setCategoryModel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the following?
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleDelete}>Yes</Button>
                <Button className='primary-button' onClick={() => setDeleteShow(false)}>No</Button>
            </Modal.Footer>
        </Modal>

    </>
    )

}


export default Category