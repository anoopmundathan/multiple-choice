import { getQuestions } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'

export const fetchPosts = () => dispatch => (
  getQuestions()
    .then(questions => {
      dispatch({
        type: GET_QUESTIONS,
        questions
      })
    })
)
