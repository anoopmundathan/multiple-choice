import React, { Component } from 'react'
import './App.css'

import { getQuestions} from './utils/api'

import Header from './components/Header'
import Detail from './components/Detail'

class App extends Component {
  state = {
    questions: [],
    loading: false
  }
  componentDidMount() {
    getQuestions()
      .then(questions => {
        this.setState({
          questions: questions,
          loading: true
        })
      })
  }

  render() {
    const { loading, questions } = this.state
    return (
      <div className="container">
        <Header name="Multiple-Choice Test" />
        {loading 
        ? (<Detail questions={questions} />)
        : (<div>Loading questions...</div>)}
      </div>
    );
  }
}

export default App
