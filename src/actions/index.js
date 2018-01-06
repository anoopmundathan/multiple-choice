import {
  fetchQuestions,
  postAnswers
}  from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SELECT_ANSWER = 'SELECT_ANSWER'
export const UPDATE_ANSWER = 'UPDATE_ANSWER'
export const GET_ANSWERS   = 'GET_ANSWERS'

export const getQuestions = () => dispatch => (
  fetchQuestions()
    .then(questions => {
      dispatch({
        type: GET_QUESTIONS,
        questions
      })
    })
)

export const postSelections = (selections) => dispatch => (
  postAnswers(selections)
    .then(answers => {
      dispatch({
        type: GET_ANSWERS,
        answers
      })
    })
)

export const selectAnswer = (selection) => {
  return {
    type: SELECT_ANSWER,
    selection
  }
}

export const updateAnswer = (selection) => {
  return {
    type: UPDATE_ANSWER,
    selection
  }
}

