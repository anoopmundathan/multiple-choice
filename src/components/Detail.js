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
import Item from './Item'
import Question from './Question'

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
    const { questions, answers, selections, error } = this.props
    
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
          <Question index={qIndex + 1} question={question.text} />
          {question.choices.map((choice, index) => {
            // make sure correct question
            if(answers[qIndex].question === question.text &&
              selections.answers[qIndex].question === question.text) {

                // correct
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    score = score + 1
                    return(<Item key={index} class="correct" text={choice.text} />)
                }

                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer === answers[qIndex].answer) {
                    return(<Item key={index} text={choice.text} />)
                }
                
                // wrong
                if(choice.text === selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(<Item key={index} class="wrong" text={choice.text} />)
                }

                if(choice.text !== selections.answers[qIndex].answer &&
                  selections.answers[qIndex].answer !== answers[qIndex].answer) {
                    return(<Item key={index} text={choice.text} />)
                }
            }
          })}
        </div>
      ))
    }

    return(
      <div className="detail">
        
        <div className="error">
          <h2>{error.error}</h2>
        </div>

        {!loaded && (
          <div className="loading">
            <h2>
              Loading questions...
            </h2>
          </div>
        )}

        {!error.error && !submited ? (
          <div>
            <ul>
              {questionList}
            </ul>
            <SubmitButton 
              onSubmitClick={this.onSubmitClick} />
          </div>
        ) : (
          null
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

const mapStateToProps = ({ questions, selections, answers, error }) => {
  return { 
    questions,
    selections,
    answers,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
