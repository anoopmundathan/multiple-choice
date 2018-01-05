import React from 'react'

const StartButton = (props) => {
  return(
    <div className="button-container">
      <input 
        className="start-button" 
        type="button" 
        value="Start" 
        onClick={props.onStartClick} />
    </div>
  )
}

export default StartButton
