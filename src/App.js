import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions } from './actions'

import Header from './components/Header'
import Detail from './components/Detail'

import './App.css'
class App extends Component {
  state = {
    loaded: false
  }
  componentDidMount() {
    this.props.loadQuestions()
      .then(() => {
        this.setState({
          loaded: true
        })
      })
  }

  render() {
    const { questions } = this.props
    const { loaded } = this.state
    return(
        <div className="container">
          <Header name="Multiple-Choice Test" />
          {loaded 
          ? (<Detail questions={questions} />)
          : (<div>Loading questions...</div>)}
        </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestions: () => dispatch(getQuestions())
  }
}

const mapStateToProps = ({ questions }) => {
  return {
    questions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
