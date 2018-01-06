import React, { Component } from 'react'
import { connect } from 'react-redux'
import Choices from './Choices'

const QuestionText = (props) => <h2>{props.text}</h2>

class Question extends Component {
  render() {
    const { text, choices, correct } = this.props.question
    return(
      <div className="question">
        <QuestionText text={text}/>
        <Choices 
          correct={this.props.correct}
          onAnswerClick={this.props.onAnswerClick} 
          choices={choices}/>
      </div>
    )
  }
}

const mapStateToProps = ({ question}) => {
  return {
    question: question.question
  }
}

export default connect(mapStateToProps)(Question)

 