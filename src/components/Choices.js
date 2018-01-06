import React, { Component } from 'react'
import { connect } from 'react-redux'

class Choices extends Component {
  state = {
    selectedOption: ""
  }

  onHandleOptionChange = (evt) => {
    this.props.onAnswerClick(evt.target.value)
    this.setState({
      selectedOption: evt.target.value,
    })
  }

  render() {

    const { choices, correct, answer } = this.props
    const optionList = choices.map((choice, index) => {
      return(
        <li key={index}>
          <input 
            onChange={(evt) => this.onHandleOptionChange(evt)}
            type="radio" 
            id={index} 
            checked={this.state.selectedOption === choice.text}
            name="choice" value={choice.text} />
          {answer[0].text === choice.text && correct 
            ? (<label className="correct" for={index}>{choice.text}</label>) 
            : (<label for={index}>{choice.text}</label>) }
        </li>
      )
    })

    return(
      <div>
        <ul>
          {optionList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ answer}) => {
  return {
    answer: answer.answer
  }
}

export default connect(mapStateToProps)(Choices)
