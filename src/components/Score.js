import React from 'react'

const Score = (props) => {
  const { score, totalQuestions } = props
  return(
    <div className="final-score">
      <h1>Score</h1>
      <h1>{Math.round((score / totalQuestions) * 100)}</h1>
    </div>
  )
}

export default Score
