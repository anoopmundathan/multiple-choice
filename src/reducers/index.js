import { combineReducers } from 'redux'

import { 
  GET_QUESTIONS, 
  GET_QUESTION,
  GET_ANSWER } from '../actions'

const questions = (state = [], action) => {
  const { questions } = action
  switch(action.type) {
    case GET_QUESTIONS:
      return questions
    default:
      return state
  }
}

const question = (state = {}, action ) => {
  switch(action.type) {
    case GET_QUESTION:
      return {
        ...state,
        question: action.question
      }
    default:
      return state
  }
}

const answer = (state = {}, action ) => {
  switch(action.type) {
    case GET_ANSWER:
      return {
        ...state,
        answer: action.answer
      }
    default:
      return state
  }
}
export default combineReducers({
  questions,
  question,
  answer
})

