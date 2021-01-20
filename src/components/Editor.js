import React, {Component} from 'react';
import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import Firebase from 'firebase';

import '../App.css';

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
// import "ace-builds/src-noconflict/worker-html";
// import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-monokai";

import config from '../config';

class Editor extends Component {
    constructor(props) {
      super(props);
      Firebase.initializeApp(config);
      this.state = {
        value:"",
        user:[]
      }
  
      this.myRef = React.createRef();
      this.onEditorChange = this.onEditorChange.bind(this)
      this.onPaste = this.onPaste.bind(this);
    }
  
    componentDidMount() {
      this.getUserData();
    }
  
    onEditorChange(newValue) {
       ReactDOM.findDOMNode(this.myRef.current).innerHTML = newValue
       localStorage.setItem('code',newValue)
    }
  
    getUserData = () => {
      let ref = Firebase.database().ref("/");
      ref.on("value", snapshot => {
        const state = snapshot.val();
        this.setState({user:state?.codes});
      });
    };
  
  
    onPaste(event){
      this.setState({
        value: event.text
      })
    }
  
    onSave = () => {
      alert('saving...')
      const userid = this.state.user;
      console.log('demm',userid)
      let saveItem = localStorage.getItem('code');
      let ref = Firebase.database().ref("/codes/user2/project-2");
      console.log('myref',ref)
      ref.set({
        user_id: 29,
        code:saveItem,
        time: new Date().getTime().toString()
      })
  
      
    }
  
    
  
    render() {
      const {value} = this.state;
      return (
        <>
        
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
        </>
      );
    }
  }
  
  export default Editor;