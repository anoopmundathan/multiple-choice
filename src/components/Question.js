import React from 'react'

const QuestionText = () => <h2>What is your name?.</h2>

const Choices = () => {
  return(
    <div className="choices">
      <ul>
        <li>
          <input type="radio" id="choice1"
          name="choice" value="Option1" />
          <label for="choice1">Option1</label>
        </li>
        <li>
          <input type="radio" id="choice1"
          name="choice" value="Option1" />
          <label for="choice1">Option1</label>
        </li>
        <li>
          <input type="radio" id="choice1"
          name="choice" value="Option1" />
          <label for="choice1">Option1</label>
        </li>
        <li>
          <input type="radio" id="choice1"
          name="choice" value="Option1" />
          <label for="choice1">Option1</label>
        </li>
      </ul>
    </div>
  )
}

const Question = () => {
  return(
    <div className="question">
      <QuestionText />
      <Choices />
    </div>
  )
}

export default Question
