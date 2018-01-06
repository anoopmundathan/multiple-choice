import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions, getQuestion, getAnswer } from '../actions'

import Question from './Question'
import NextButton from './NextButton'
import StartButton from './StartButton'
import Progress from './Progress'

class Detail extends Component {
  state = {
    index: 0,
    loaded: false,
    completed: false,
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
      this.setState({ completed: true })
    }
  }

  onStartClick = () => {
    const { questions } = this.props
    this.setState({
      index: 0,
      completed: false,
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
    const { index, completed, loaded, clicked } = this.state
    const { questions, answer } = this.props
    
    const length = questions.length
    const current = index + 1

    return(
      <div className="detail">

        <Progress index={current} length={length} />
      
        {!loaded && (
          <div>Loading questions...</div>
        )}
        
        {loaded && !completed ?(
          <div>
            <Question 
              onAnswerClick={this.onAnswerClick}/>
            {this.state.clicked && (
              <p>Answer: {answer[0].text}</p>
            )}
            <NextButton
              clicked={clicked}
              onNextClick={this.onNextClick.bind(this)} />
          </div>
        ): null}

        {completed && (
          <div>
            <h2>Quiz completed</h2>
            <StartButton 
              onStartClick={this.onStartClick.bind(this)}/>
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
