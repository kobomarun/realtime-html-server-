import React, {Component} from 'react';
import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import Logo from './unlock-logo.png';

import './App.css';

import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-min-noconflict/mode-python";
import "ace-builds/src-min-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-spellcheck";
import "ace-builds/src-min-noconflict/snippets/javascript";
import 'ace-builds/src-min-noconflict/ext-searchbox';
import "ace-builds/webpack-resolver";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/worker-html";
// import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-monokai";

const ace = require('ace-builds/src-noconflict/ace');
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/");
ace.config.setModuleUrl('ace/mode/javascript_worker', "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js");


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:""
    }

    this.myRef = React.createRef();
    this.onEditorChange = this.onEditorChange.bind(this)
    this.onPaste = this.onPaste.bind(this);
  }

  onEditorChange(newValue) {
     ReactDOM.findDOMNode(this.myRef.current).innerHTML = newValue
     localStorage.setItem('code',newValue)
  }

  onPaste(event){
    this.setState({
      value: event.text
    })
  }

  render() {
    const {value} = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="nav">
            <img src={Logo} width="100px" height="100px" style={{marginLeft:50}}/>
              <h1 className="h1">Practice Editor</h1>
          </div>
          <div className="nav menu">
            <button className="btn">Open</button>
            <button className="btn">Save</button>
          </div>
        </div>
        <div className="header">
          <div>
            <h2>HTML/CSS</h2>
          </div>
          <div>
            <h2>Preview</h2>
          </div>
        </div>
        <div className="flex-split" style={{marginLeft:55,marginRight:55}}>
          <div className="flex-split-left mee">
              <AceEditor
                mode="html"
                theme="monokai"
                name="awesome-code"
                height= {"100%"}
                width={"100%"}
                ref="aceEditor"
                onChange={this.onEditorChange}
                // onPaste= {this.onPaste}
                fontSize={14}
                showPrintMargin={true}
                focus={true}
                editorProps={{ $blockScrolling: true }}
                wrapEnabled= {true}
                highlightActiveLine={true}
                autoScrollEditorIntoView ={true}
              value={value}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  showGutter: true
                }}/>
          </div>

          <div className="flex-split preview">
              <div ref={this.myRef} /> 
          </div>
        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}

export default App;
