import React, { Component } from 'react'

import Question from './Question'
import NextButton from './NextButton'
import StartButton from './StartButton'

class Detail extends Component {
  state = {
    question: "",
    choices: [],
    index: 0,
    complete: false
  }

  componentDidMount() {
    const { questions } = this.props
    const { index } = this.state

    this.setState({
      question: questions[index].text,
      choices: questions[index].choices
    })
  }

  onNextClick = () => {
    // Increment to next question
    const { questions } = this.props

    let index = this.state.index + 1

    if (index < questions.length) {
      this.setState({
        question: questions[index].text,
        choices: questions[index].choices,
        index: index
      })
    } else {
      this.setState({ complete: true })
    }
  }

  onStartClick = () => {
    const { questions } = this.props
    let index = 0

    this.setState({
      question: questions[index].text,
      choices: questions[index].choices,
      index: 0,
      complete: false
    })
  }

  render() {
    const { question, choices, index, complete } = this.state
    const { questions } = this.props
    return(
      <div className="detail">
        <p>{index + 1} / {questions.length}</p>

        {complete && (
          <div>
            <h2>Quiz completed</h2>
            <StartButton onStartClick={this.onStartClick.bind(this)}/>
          </div>
        )}

        {!complete && (
          <div>
            <Question question={question} choices={choices}/>
            <NextButton onNextClick={this.onNextClick.bind(this)}/>
          </div>
        )}

      </div>
    )
  }
}

export default Detail
