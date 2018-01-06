import React from 'react'

const NextButton = (props) => {

  const buttonClass = ['next-button']
  if(props.clicked) {
    buttonClass.push('next-button-active')
  } else {
    buttonClass.push('next-button-inactive')
  }

  return(
    <div className="button-container">
      <input 
        className={buttonClass.join(' ')}
        disabled={!props.clicked}
        type="button" 
        value="Next Question" 
        onClick={props.onNextClick} />
    </div>
  )
}

export default NextButton
