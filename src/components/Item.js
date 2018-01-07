import React from 'react'

const Item = (props) => {
  return(
    <li className={props.class}>
      <label>{props.text}</label>
    </li>
  )
}

export default Item 
