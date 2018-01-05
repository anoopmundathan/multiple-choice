import { combineReducers } from 'redux'

import { GET_QUESTIONS, GET_QUESTION } from '../actions'

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

export default combineReducers({
  questions,
  question
})

