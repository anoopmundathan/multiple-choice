import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Question from './components/Question'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header name="Multiple-Choice Test" />
        <Question />
      </div>
    );
  }
}

export default App
