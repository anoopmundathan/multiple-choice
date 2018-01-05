import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions, getQuestion, getAnswer } from '../actions'

import Question from './Question'
import NextButton from './NextButton'
import StartButton from './StartButton'

class Detail extends Component {
  state = {
    index: 0,
    loaded: false,
    complete: false,
    clicked: false
  }
  
  componentDidMount() {
    // 1. Load all questions
    this.props.loadQuestions()
      .then(() => {
        this.loadQuestionAndAnswer(this.state.index)
        this.setState({ loaded: true })
      })
  }

  onNextClick = () => {
    const { questions } = this.props
    let index = this.state.index + 1
    if (index < questions.length) {
      this.loadQuestionAndAnswer(index)
      this.setState({ 
        index: index,
        clicked: false
      })
    } else {
      this.setState({ complete: true })
    }
  }

  onStartClick = () => {
    const { questions } = this.props
    this.setState({
      index: 0,
      complete: false,
      clicked: false
    })
    this.loadQuestionAndAnswer(0)
  }

  loadQuestionAndAnswer = (index) => {
    const { questions } = this.props
    const choices = questions[index].choices
    const answer = choices.filter(choice => choice.answer)
    this.props.loadQuestion(questions[index])
    this.props.loadAnswer(answer)
  }

  onAnswerClick = () => {
    this.setState({
      clicked: true
    })
  }

  render() {
    const { index, complete, loaded } = this.state
    const { questions } = this.props
  
    return(
      <div className="detail">
        <p>{index + 1} / {questions.length}</p>

        {!loaded && (
          <div>Loading questions...</div>
        )}
        
        {loaded && !complete ?(
          <div>
            <Question onAnswerClick={this.onAnswerClick}/>
            {this.state.clicked && (
              <p>Answer: {this.props.answer[0].text}</p>
            )}
            <NextButton onNextClick={this.onNextClick.bind(this)} />
          </div>
        ): null}

        {complete && (
          <div>
            <h2>Quiz completed</h2>
            <StartButton onStartClick={this.onStartClick.bind(this)}/>
          </div>
        )}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestions: () => dispatch(getQuestions()),
    loadQuestion: (question) => dispatch(getQuestion(question)),
    loadAnswer: (answer) => dispatch(getAnswer(answer))
  }
}

const mapStateToProps = ({ questions, answer }) => {
  return { 
    questions,
    answer: answer.answer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
