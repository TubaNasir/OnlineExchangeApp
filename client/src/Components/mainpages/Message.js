import React from 'react'
import '../UI/Message.css'

function Message({ own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
                <img
                    className='messageImg'
                    src='https://c.ndtvimg.com/2019-07/tvnofip8_nawaz-sharif-reuters_625x300_07_July_19.jpg'
                    alt=""
                />
                <p className='messageText'>Mian Muhammad Nawaz Sharif is a Pakistani businessman and politician who served as the Prime Minister of Pakistan for three non-consecutive terms.</p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}

export default Message