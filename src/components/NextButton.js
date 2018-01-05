import React from 'react'

const NextButton = (props) => {
  return(
    <div className="button-container">
      <input 
        className="next-button" 
        type="button" 
        value="Next Question" 
        onClick={props.onNextClick} />
    </div>
  )
}

export default NextButton
