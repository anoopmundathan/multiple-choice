import React, { Component } from 'react'

import Header from './components/Header'
import Detail from './components/Detail'

import './App.css'
class App extends Component {

  render() {
    return(
        <div className="container">
          <Header name="Multiple-Choice Test" />
          <Detail />
        </div>
      )
  }
}

export default App
