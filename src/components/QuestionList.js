import React  from 'react'

import ListItem from './ListItem'
const QuestionList = (props) => {
  const { index, question, onHandleOptionChange } = props
  return(
    <div>
          <h3>{index + 1} . {question.text}</h3>
          {question.choices.map((choice, index) => (
            <ListItem 
              key={index}
              question={question.text}
              choice={choice.text}
              onHandleOptionChange={onHandleOptionChange} />
          ))}
    </div>
  )
}

export default QuestionList
