import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getQuestions, 
  selectAnswer, 
  updateAnswer } from '../actions'

import SubmitButton  from './SubmitButton'

class Detail extends Component {
  state = {
    loaded: false,
    selections: []
  }
  
  componentDidMount() {
    this.props.loadQuestions()
      .then(() => {
        this.setState({ loaded: true })
      })
  }

  onSubmitClick = () => {
    
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
    const { loaded } = this.state
    
    const questionList = this.props.questions.map((question, index) => (
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

    return(
      <div className="detail">
      
        {!loaded && (
          <div>Loading questions...</div>
        )}

        {questionList}
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
    updateAnswer: (answer) => dispatch(updateAnswer(answer))   
  }
}

const mapStateToProps = ({ questions, selections }) => {
  return { 
    questions, 
    selections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
