import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Detail from './components/Detail'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header name="Multiple-Choice Test" />
        <Detail questions={questions}/>
      </div>
    );
  }
}

const questions = [
  {
    text: 'What is your name',
    choices: [
      {
        text: 'Anoop',
        answer: false
      },
      {
        text: 'Mundathan',
        answer: false
      },
      {
        text: 'Anvita',
        answer: true
      },
      {
        text: 'Neethu',
        answer: false
      },
    ]
  },
  {
    text: 'What is your wife name',
    choices: [
      {
        text: 'ABC',
        answer: false
      },
      {
        text: 'BCD',
        answer: false
      },
      {
        text: 'WWF',
        answer: false
      },
      {
        text: 'Neethu',
        answer: true
      },
    ]
  },
  {
    text: 'Where are you living',
    choices: [
      {
        text: 'London',
        answer: false
      },
      {
        text: 'Paris',
        answer: false
      },
      {
        text: 'Newyork',
        answer: false
      },
      {
        text: 'Sydney',
        answer: true
      },
    ]
  }
]

export default App
