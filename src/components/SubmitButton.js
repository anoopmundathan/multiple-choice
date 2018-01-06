import React from 'react'

const SubmitButton = (props) => {

  return(
    <div className="button-container">
      <input 
        className='submit-button'
        type="button" 
        value="Submit " 
        onClick={props.onSubmitClick} />
    </div>
  )
}

export default SubmitButton
