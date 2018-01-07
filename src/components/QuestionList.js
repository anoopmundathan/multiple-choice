import React  from 'react'
import ListItem from './ListItem'
import Question from './Question'

const QuestionList = (props) => {
  const { index, question, onHandleOptionChange } = props
  return(
    <div>
          <Question index={index + 1} question={question.text} />
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
