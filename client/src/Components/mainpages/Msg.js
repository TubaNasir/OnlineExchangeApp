import React, { useState, useContext } from 'react'
import '../UI/Msg.css'
import Conversation from './Conversation'
import Message from './Message'
import { GlobalState } from '../../GlobalState'
import { useEffect } from 'react'
import axios from 'axios'


function Msg() {
    const state = useContext(GlobalState)
    console.log(state)

    const user = state.UserAPI.user
    console.log(user)

    const [conversations, setConversations] = useState([]);
    //whenever refresh it tries to fetch all the conversations
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user.id)
                setConversations(res)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [user._id])



    console.log(user)

    return (
        <div className='Msg'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    <input placeholder='Search For Friends' className='chatInputMeun'></input>
                    {conversations.map(c => (
                        <Conversation conversation={c} currentUser={user} /> //sending th conversation as a prop
                    ))}

                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className='chatBoxTop'>
                        <Message />
                        <Message own={true} />
                        <Message />


                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className="chatMessageInput" placeholder='Enter the text.....'></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Msg