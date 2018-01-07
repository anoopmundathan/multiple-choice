import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getQuestions, 
  postSelections,
  selectAnswer, 
  updateAnswer } from '../actions'

import SubmitButton  from './SubmitButton'
import QuestionList from './QuestionList'
import Score from './Score'

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
    let answerStatusList = null

    if(!submited) {
      questionList = questions.map((question, index) => (
        <QuestionList 
          key={index}
          index={index}
          question={question}
          onHandleOptionChange={this.onHandleOptionChange} />
      ))
    } else {
      answerStatusList = questions.map((question, qIndex) => (
        <div key={qIndex}>
          <h3>{qIndex + 1} . {question.text}</h3>
          {console.log(question.choices)}
          {question.choices.map((choice, index) => {
            // make sure correct question
            if(answers[qIndex].question === question.text &&
              selections.answers[qIndex].question === question.text) {

                // correct
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    
                    // increase the score
                    score = score + 1

                    return(
                      <li key={index} className="correct">
                        <label>{choice.text}</label>
                      </li>
                    )
                }

                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    return(
                      <li key={index}>
                        <label>{choice.text}</label>
                      </li>
                    )
                }
                
                // wrong
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(
                      <li key={index} className="wrong">
                        <label>{choice.text}</label>
                      </li>
                    )
                }

                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(
                      <li key={index}>
                        <label>{choice.text}</label>
                      </li>
                    )
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

        {!submited && (
          <div>
            <ul>
              {questionList}
            </ul>
            <SubmitButton 
              onSubmitClick={this.onSubmitClick} />
          </div>
        )}

        {submited && (
          <div>
            <Score 
              score={score}
              totalQuestions={questions.length} />
            <ul>
              {answerStatusList}
            </ul>
          </div>
        )}

      </div>
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
