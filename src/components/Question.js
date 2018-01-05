import React, { Component } from 'react'

const QuestionText = (props) => <h2>{props.text}</h2>

const Choices = (props) => {
  const optionList = props.choices.map((choice, index) => {
    return(
      <li key={index}>
        <input type="radio" id={index}
        name="choice" value={choice.text} />
        <label for={index}>{choice.text}</label>
      </li>
    )
  })
  return(
    <ul>
      {optionList}
    </ul>
  )
}
class Question extends Component {
  render() {
    const { question, choices } = this.props
    return(
      <div className="question">
        <QuestionText text={question}/>
        <Choices choices={choices}/>
      </div>
    )
  }
}

export default Question


 