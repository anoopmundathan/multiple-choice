import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getQuestions, 
  postSelections,
  selectAnswer, 
  updateAnswer } from '../actions'

import SubmitButton  from './SubmitButton'

class Detail extends Component {
  state = {
    loaded: false,
    submited: false
  }
  
  componentDidMount() {
    this.props.loadQuestions()
      .then(() => {
        this.setState({ loaded: true })
      })
  }

  onSubmitClick = () => {
    this.props.submitAnswer(this.props.selections.answers)
    .then(() => {
      this.setState({ submited: true })
    })
  }

  onHandleOptionChange = (question, choice) => {
    const { answers } = this.props.selections
    
    // Check if any selection is made for particular question
    const check = answers.filter(answer => answer.question === question)

    // if no selection is made add else update
    if(check.length === 0 ) {
      this.props.addAnswer({question, choice})
    } else {
      this.props.updateAnswer({question, choice})
    }

  }

  render() {
    const { loaded, submited } = this.state
    let questionList
    let answerList
    if(!submited) {
      questionList = this.props.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.text}</h3>
          {question.choices.map((choice, index) => (
            <List 
              key={index}
              question={question.text}
              choice={choice.text}
              onHandleOptionChange={this.onHandleOptionChange} />
          ))}
        </div>
      ))
    } else {
      answerList = this.props.answers.map((answer, index) => (
        <div>
          <h3>{answer.text}</h3>
          {answer.choices.map((choice, index) => (
            <li key={index}>
              {choice.text}
              {choice.answer}
            </li>
          ))}
        </div>
      ))
    }

    return(
      <div className="detail">
      
        {!loaded && (
          <div>Loading questions...</div>
        )}

        {questionList}
        {answerList}
        <SubmitButton 
          onSubmitClick={this.onSubmitClick} />
      
      </div>
    )
  }
}

class List extends Component {
  onChange = () => {
    const { question, choice} = this.props
    this.props.onHandleOptionChange(question, choice)
  }

  render() {
    const { question, choice } = this.props
    return(
      <li>
        <input type="radio" 
          onChange={this.onChange}
          name={question}
          id={choice} 
          value={choice} />
        <label htmlFor={choice}>{choice}</label>
    </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestions: () => dispatch(getQuestions()),
    addAnswer: (answer) => dispatch(selectAnswer(answer)),   
    updateAnswer: (answer) => dispatch(updateAnswer(answer)),
    submitAnswer: (answers) => dispatch(postSelections(answers))   
  }
}

const mapStateToProps = ({ questions, selections, answers }) => {
  return { 
    questions, 
    selections,
    answers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
