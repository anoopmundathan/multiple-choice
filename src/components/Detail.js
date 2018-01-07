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

    // Submit only if all questions are answered
    const selectionLength = this.props.selections.answers.length
    if(selectionLength === this.props.questions.length) {
      this.props.submitAnswer(this.props.selections.answers)
      .then(() => {
        this.setState({ submited: true })
      })
    }
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
    let score = 0;
    const { loaded, submited } = this.state
    const { questions, answers, selections } = this.props
    let questionList = null
    let answerList = null
    if(!submited) {
      questionList = questions.map((question, index) => (
        <div key={index}>
          <h3>{index + 1} . {question.text}</h3>
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
      answerList = questions.map((question, qIndex) => (
        <div key={qIndex}>
          <h3>{question.text}</h3>
          {question.choices.map((choice, index) => {

            // make sure correct question
            if(answers[qIndex].question === question.text &&
              selections.answers[qIndex].question === question.text) {

                // if correct
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    score = score + 1
                    return(<li className="correct">
                      <label>{choice.text}</label></li>)
                }

                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    return(<li><label>{choice.text}</label></li>)
                }
                
                // if wrong
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(<li className="wrong">
                      <label>{choice.text}</label>
                    </li>)
                }

                //
                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(<li><label>{choice.text}</label></li>)
                }
            }
          })}
        </div>
      ))
    }

    return(
      <div className="detail">
      
        {!loaded && (
          <div>Loading questions...</div>
        )}

        <ul>
          {questionList}
        </ul>

        <ul>
          {answerList}
        </ul>
        Score : {score} / {questions.length}
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
