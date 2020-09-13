import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Map from './pages/Map'
import Header from './components/Header'

import './assets/styles/main.css'


function App() {
  return (
      <div className='content-wrap'>
          <Router>
              <Header />
              <main className="main">
                  <Switch>
                      <Route exact component={Map} />
                  </Switch>
              </main>
          </Router>
      </div>

  );
}

export default App;
