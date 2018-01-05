import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const { text, choices } = this.props.question
    console.log(this.props)
    return(
      <div className="question">
        <QuestionText text={text}/>
        <Choices choices={choices}/>
      </div>
    )
  }
}

const mapStateToProps = ({ question }) => {
  return {
    question: question.question
  }
}

export default connect(mapStateToProps)(Question)

 