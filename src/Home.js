import React from 'react'
import {signInWithGoogle} from './auth'
import Header from './components/Header'


const Home = () => {
    return (
        <>
        <Header />
       <div className="home-container">
           <div className="right-side">
            <div className="column ">
                <button className="login-btn" onClick={signInWithGoogle}>Sign iin with Gmail</button>
            </div>
           </div>
       </div>
       </>
    )
}

export default Home