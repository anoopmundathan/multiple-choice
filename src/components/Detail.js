import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions, getQuestion, getAnswer } from '../actions'

import Question from './Question'
import NextButton from './NextButton'
import StartButton from './StartButton'
import Progress from './Progress'
import Answer from './Answer';

class Detail extends Component {
  state = {
    index: 0,
    loaded: false,
    completed: false,
    clicked: false,
    correct: "",
    clickedOption: ""
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
        clicked: false,
        correct: "",
        clickedOption: ""
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
      clicked: false,
      correct: "",
      clickedOption: ""
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

  onAnswerClick = (choice) => {

    if(this.state.correct === "" && !this.state.clicked) {
      if(choice === this.props.answer[0].text) {
        // correct answer
        this.setState({ correct: true})
      } else {
        // wrong answer
        this.setState({ 
          correct: false,
          clickedOption: choice
        })
      } 
    }

    this.setState({
      clicked: true
    })
  }

  render() {
    const { index, completed, loaded, clicked, correct, clickedOption } = this.state
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
              correct={correct} 
              clicked={clicked}
              clickedOption={clickedOption}
              onAnswerClick={this.onAnswerClick}/>

            {this.state.clicked && (
              <Answer answer={answer[0].text}/>
            )}

            <NextButton
              clicked={clicked}
              onNextClick={this.onNextClick.bind(this)} />
          </div>
        ): null}

        {completed && (
          <div className="start">
            <h2>Test completed. Start again?.</h2>
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
