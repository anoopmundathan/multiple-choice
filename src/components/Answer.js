import React from 'react'

const Answer = (props) => {
  return(
    <div className="answer-container">
      <label className="answer-title">Answer: </label>
      <label className="answer">{props.answer}</label>
    </div>
  )
}

export default Answer
