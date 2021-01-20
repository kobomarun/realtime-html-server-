import React from 'react';
import Logo from '../unlock-logo.png'

const Header = (props) => {
return(
    <>
        <div className="container">
          <div className="nav">
            <img src={Logo} width="100px" height="100px" style={{marginLeft:50}}/>
              <h1 className="h1">Practice Editor</h1>
          </div>
          <div className="nav menu">
            <button className="btn">Open</button>
            <button className="btn" onClick={props.onSave}>Save</button>
          </div>
        </div>
    </>
)
}

export default Header; 