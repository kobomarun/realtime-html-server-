import React, {Component} from 'react';
import Header from './components/Header'
import './App.css';
import Footer from './components/Footer';
import Editor from './components/Editor';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ShareUrl from './ShareUrl';

class App extends Component {
 constructor(props) {
   super(props);
 }
  render() {

    return (
      <div className="App">
        <Route path="/editor">
            <Editor onSave={this.props.onSave}/> 
          </Route>
          <Route path="/view/:id">
            <ShareUrl /> 
          </Route>
       <Header onSave={this.onSave}/>
       
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Footer />
        </Switch>
      </div>
    );
  }
}

export default App;
