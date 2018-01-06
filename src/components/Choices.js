import React, { Component } from 'react'

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

    const { choices, correct, clicked, clickedOption } = this.props
    const optionList = choices.map((choice, index) => {
      return(
        <li key={index}>
          <input 
            onChange={(evt) => this.onHandleOptionChange(evt)}
            type="radio" 
            id={index} 
            checked={this.state.selectedOption === choice.text}
            name="choice" value={choice.text} />

          {clicked && clickedOption === choice.text && correct
            ? (<label className="correct" htmlFor={index}>{choice.text}</label>) 
            : (null) 
          }

          {clicked && clickedOption === choice.text && !correct
            ? (<label className="wrong" htmlFor={index}>{choice.text}</label>) 
            : (null) 
          }
          
          {!clicked && clickedOption === ""
            ? (<label htmlFor={index}>{choice.text}</label>) 
            : (null) 
          }

          {clicked && clickedOption !== choice.text
            ? (<label htmlFor={index}>{choice.text}</label>) 
            : (null) 
          }
          
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


