const api = 'http://localhost:5001'

// GET /questions
export const getQuestions = () => {
  return fetch(`${api}/questions`)
    .then(response => response.json())
    .then(data => data)
}
