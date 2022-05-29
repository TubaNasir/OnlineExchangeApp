import React,{useState,useContext} from 'react'
import '../UI/Title.css'

function Title({title}) {
    return(
        <div className='title'>{title}</div>
    )
}

export default Title