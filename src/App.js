import React, { Component } from 'react';
import './App.css';
import Weather from './containers/Weather/Weather';
import Auth from './containers/Auth/Auth';
import Layout from './containers/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import Saved from './containers/Saved/Saved';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/Actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }

  render() {
    return (
        <div className="App">
          <Layout>
            <Navbar />
            <Route path='/auth' exact component={Auth} />
            <Route path='/saved' exact component={Saved} />
            <Route path='/' exact component={Weather} />
          </Layout>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
