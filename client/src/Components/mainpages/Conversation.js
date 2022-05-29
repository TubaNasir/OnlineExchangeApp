import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../UI/Conversation.css'

function Conversation({ conversation, currentUser }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendID = conversation.member.find(m => m !== currentUser._id)

        const getUser = async () => {
            const res = await axios("/user")
        }
    })

    return (
        <div className='conversation'>
            <img
                className='conversationImg'
                src='https://c.ndtvimg.com/2019-07/tvnofip8_nawaz-sharif-reuters_625x300_07_July_19.jpg'
                alt="" />
            <span className='conversationName'>Nawaz Sharif</span>
        </div>
    )
}

export default Conversation