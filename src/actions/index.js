import fetchQuestions  from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'

export const getQuestions = () => dispatch => (
  fetchQuestions()
    .then(questions => {
      dispatch({
        type: GET_QUESTIONS,
        questions
      })
    })
)
