const api = 'http://localhost:5001'

// GET /questions
export const fetchQuestions = () => {
  return fetch(`${api}/questions`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => ({
      error: 'Server is down'
    }))
}

// POST /questions
export const postAnswers = (selections) => {
  return fetch(`${api}/answers`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selections)
  })
  .then(response => response.json())

}
