import React , { useState, useContext} from 'react'
import {useParams} from  'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../UI/SubHeader.css'
import {IoMdArrowDropdown} from "react-icons/io";


function SubHeader (){

    const state = useContext(GlobalState)
    const [categories] = state.CategoryAPI.categories
    //const [slug, setSlug] = state.AdvertisementAPI.slug
    const params = useParams()

    const renderCategories = (categories) => {

        let cat = [];
        for (let category of categories) {
            cat.push(
                <li  key ={category.name}>
                    {category.parentId ? <a href={category.slug}>{category.name}</a>:
                    <span><a href={category.slug}>{category.name}<IoMdArrowDropdown/></a></span>}
                    
                    {category.children.length > 0 ? <ul>{renderCategories(category.children)}</ul>:null}
                </li>
            )
        }
        return cat;

    }

    return(
        <div className='subHeader'>
            <ul>
                {categories.length> 0 ? (renderCategories(categories)):null}
            </ul>
        </div>
    )
}

export default SubHeader