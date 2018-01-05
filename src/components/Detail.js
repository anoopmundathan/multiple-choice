import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions, getQuestion } from '../actions'

import Question from './Question'
import NextButton from './NextButton'
import StartButton from './StartButton'

class Detail extends Component {
  state = {
    index: 0,
    loaded: false,
    complete: false
  }
  
  componentDidMount() {
    this.props.loadQuestions()
      .then(() => {
        const { index } = this.state
        this.props.loadQuestion(this.props.questions[index])
        this.setState({ loaded: true })
      })
  }

  onNextClick = () => {
    // Increment to next question
    const { questions } = this.props
    let index = this.state.index + 1
    if (index < questions.length) {
      this.props.loadQuestion(questions[index])
      this.setState({ index: index })
    } else {
      this.setState({ complete: true })
    }
  }

  onStartClick = () => {
    const { questions } = this.props
    this.setState({
      index: 0,
      complete: false
    })
    this.props.loadQuestion(questions[this.state.index])
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
            <Question />
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
    loadQuestion: (question) => dispatch(getQuestion(question))
  }
}

const mapStateToProps = ({ questions }) => {
  return { 
    questions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
