import fetchQuestions  from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const GET_QUESTION = 'GET_QUESTION'

export const getQuestions = () => dispatch => (
  fetchQuestions()
    .then(questions => {
      dispatch({
        type: GET_QUESTIONS,
        questions
      })
    })
)

export const getQuestion = (question) => ({
  type: GET_QUESTION,
  question
})
