import React, { Component } from 'react'

class Choices extends Component {
  state = {
    selectedOption: ""
  }

  onHandleOptionChange = (evt) => {
    this.props.onAnswerClick();
    this.setState({
      selectedOption: evt.target.value,
    })
  }

  render() {
    const { choices } = this.props
    const optionList = choices.map((choice, index) => {
      return(
        <li key={index}>
          <input 
            onChange={(evt) => this.onHandleOptionChange(evt)}
            type="radio" 
            id={index} 
            checked={this.state.selectedOption === choice.text}
            name="choice" value={choice.text} />
          <label for={index}>{choice.text}</label>
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

export default Choices
