import React from 'react'

const Progress = (props) => {
  return(
    <div className="progress">
      <h3>{props.index} / {props.length}</h3>
    </div>
  )
}

export default Progress
