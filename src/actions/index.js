import fetchQuestions  from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SELECT_ANSWER = 'SELECT_ANSWER'
export const UPDATE_ANSWER = 'UPDATE_ANSWER'

export const getQuestions = () => dispatch => (
  fetchQuestions()
    .then(questions => {
      dispatch({
        type: GET_QUESTIONS,
        questions
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

