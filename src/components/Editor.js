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
import Logo from '../unlock-logo.png'

class Editor extends Component {
    constructor(props) {
      super(props);
    //   Firebase.initializeApp(config);
      this.state = {
        value:"",
        user: null,
        share:''
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
        const userData = localStorage.getItem('auth');
        const user = JSON.parse(userData)
        this.setState({user:user})
    //   let ref = Firebase.database().ref("/");
    //   ref.on("value", snapshot => {
    //     const state = snapshot.val();
    //     this.setState({user:state?.codes});
    //   });
    };
  
  
    onPaste(event){
      this.setState({
        value: event.text
      })
    }
    
  
    onSave = () => {
      
    const project_name = localStorage.getItem('pname');
    if(project_name == null){
        let pname = prompt('Save your project')
        localStorage.setItem('pname',pname)
        const user = this.state.user;
      let saveItem = localStorage.getItem('code');
      let ref = Firebase.database().ref(`/codes/${user.name}/${pname}`);
      ref.set({
        user_id: user.id,
        code:saveItem,
        time: new Date().getTime().toString()
      })
    } else {
        const user = this.state.user;
      let saveItem = localStorage.getItem('code');
      let ref = Firebase.database().ref(`/codes/${user.name}/${project_name}`);
      ref.set({
        user_id: user.id,
        code:saveItem,
        time: new Date().getTime().toString()
      })
    }
  
      
    }

    shareURL = () => {
        
        const project_name = localStorage.getItem('pname');
        const user = this.state.user;
        if(project_name == null){
            let pname = prompt('Save your project')
            localStorage.setItem('pname',pname);
            this.setState({
                share:`${window.location.hostname}/${user.name}/${pname}`
            })
            alert('Copy the Url')
        } else {
            this.setState({
                share:`${window.location.hostname}:3001/view/${user.name.replace(/\s/g, '-')}/${project_name}`
            })
            alert('Copy the Url')
        }
        
    }
  
    
  
    render() {
      const {value} = this.state;
      return (
        <>
        <div className="container">
          <div className="nav">
            <img src={Logo} width="100px" height="100px" style={{marginLeft:50}}/>
              <h1 className="h1">Practice Editor</h1>
          </div>
          <div className="nav menu">
            {/* <button className="btn">New Project</button> */}
       <button className="btn" onClick={this.shareURL}>Share URL</button>
            <button className="btn" onClick={this.onSave}>Save</button>
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
          {
                  this.state.share !== '' ? <div className="share-url">Share URL: {this.state.share}</div>:''
              }
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