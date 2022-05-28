import React from 'react'
import {RotatingLines} from 'react-loader-spinner'

export const Loading = () => {
  return (
    <div  className="loadingContainer" style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%,50%)'}}>
      <RotatingLines
      color="#00b22d"
      height={100}
      width={100}
       //3 secs
    /></div>
  )
}

export default Loading