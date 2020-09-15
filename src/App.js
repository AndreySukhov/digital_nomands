import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Map from './pages/Map'
import Header from './components/Header'
import Nav from './components/Nav'

import './assets/styles/main.css'

const DistrictContext = React.createContext({district: null});

class DistrictProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            district: null
        }
    }

    setDistrict = (district) => {
        this.setState({
            district
        })
    }


    render() {

        return (
            <DistrictContext.Provider value={{
                district: this.state.district,
                setDistrict: this.setDistrict
            }}>
                {this.props.children}
            </DistrictContext.Provider>
        )
    }

}

function App() {
  return (
      <div className='content-wrap'>
          <DistrictProvider>
              <Router>
                  <div className="main-grid">
                      <div className="main-grid-aside">
                          <Nav />
                      </div>
                      <div className="main-grid-main">
                          <Header />
                          <main className="main">
                              <Switch>
                                  <Route exact path={'/'} component={Map} />
                                  <Route render={() => {
                                      return (
                                          <div>Page not found</div>
                                      )
                                  }} />
                              </Switch>
                          </main>
                      </div>
                  </div>
              </Router>
          </DistrictProvider>
      </div>

  );
}


export default App;

export { DistrictContext }
