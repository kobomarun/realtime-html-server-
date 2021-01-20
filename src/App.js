import React, {Component} from 'react';
import Header from './components/Header'

import './App.css';
import Footer from './components/Footer';
import Editor from './components/Editor';

class App extends Component {
 
  render() {

    return (
      <div className="App">
       <Header onSave={this.onSave}/>
       <Editor />
        <Footer />
      </div>
    );
  }
}

export default App;
