import { combineReducers } from 'redux'
import { GET_QUESTIONS } from '../actions'

const questions = (state = { questions: [] }, action) => {
  switch(action.type) {
    case GET_QUESTIONS:
      return {
        questions: [...state.questions]
      }
    default:
      return state
  }
}

export default questions
