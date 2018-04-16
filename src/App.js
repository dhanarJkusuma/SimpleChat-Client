import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import './App.css';

import ChatPage from './components/ChatPage';
import ChatLogin from './components/ChatLogin';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
            <Route path="/signin" component={ ChatLogin }/>
            <Route path="/chat" component={ ChatPage } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
