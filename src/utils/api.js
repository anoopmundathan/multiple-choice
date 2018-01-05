const api = 'http://localhost:5001'

// GET /questions
const fetchQuestions = () => {
  return fetch(`${api}/questions`)
    .then(response => response.json())
    .then(data => data)
}

export default fetchQuestions
