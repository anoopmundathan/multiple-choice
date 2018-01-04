import React, { Component } from 'react'

import Question from './Question'
import NextButton from './NextButton'

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

  render() {
    const { question, choices, index, complete } = this.state
    const { questions } = this.props
    return(
      <div className="detail">
        <p>{index + 1} / {questions.length}</p>
        {complete && <p>Completed</p> }
        {!complete && (
          <Question question={question} choices={choices}/>
        )}
        <NextButton onNextClick={this.onNextClick.bind(this)}/>
      </div>
    )
  }
}

export default Detail
