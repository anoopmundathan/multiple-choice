import React, { Component } from 'react'

class ListItem extends Component {
  onChange = () => {
    const { question, choice} = this.props
    this.props.onHandleOptionChange(question, choice)
  }

  render() {
    const { question, choice } = this.props
    return(
      <li>
        <input type="radio" 
          onChange={this.onChange}
          name={question}
          id={choice} 
          value={choice} />
        <label htmlFor={choice}>{choice}</label>
    </li>
    )
  }
}

export default ListItem
