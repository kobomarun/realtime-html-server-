import React from 'react'
import {signInWithGoogle} from './auth'


const Home = () => {
    return (
       <div className="home-container">
           <div className="right-side">
            <div className="column ">
                <button className="login-btn" onClick={signInWithGoogle}>Sign iin with Gmail</button>
            </div>
           </div>
       </div>
    )
}

export default Home