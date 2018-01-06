import { combineReducers } from 'redux'

import { 
  GET_QUESTIONS, 
  SELECT_ANSWER,
  UPDATE_ANSWER,
  GET_ANSWERS,
 } from '../actions'

const questions = (state = [], action) => {
  const { questions } = action
  switch(action.type) {
    case GET_QUESTIONS:
      return questions
    default:
      return state
  }
}

const answers = (state = [], action) => {
  const { answers } = action
  switch(action.type) {
    case GET_ANSWERS:
      return answers
    default:
      return state
  }
}

const selections = (state = { answers: [] }, action ) => {
  switch(action.type) {
    case SELECT_ANSWER:
      const { question, choice } = action.selection
      const addAnswer = [...state.answers, {
        question: question,
        answer: choice
      }]
      return {
        ...state, 
        answers: addAnswer
      }
    case UPDATE_ANSWER: 
      const updateAnswer = state.answers.map((answer, index) => {
        if(answer.question === action.selection.question) {
          return {
            ...answer, 
            answer: action.selection.choice
          }
        }
        return answer
      })

      return {
        ...state, 
        answers: updateAnswer
      }

    default:
      return state
  }
}
export default combineReducers({
  questions,
  selections,
  answers
})

