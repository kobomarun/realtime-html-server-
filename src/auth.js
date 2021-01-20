import firebase from "firebase/app"
import "firebase/auth";
import config from './config';

firebase.initializeApp(config)

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
      const user = {
          id: new Date().getTime().toString(),
          name:res.user.displayName,
          email:res.user.email
      }
      localStorage.setItem('auth',JSON.stringify(user))
      window.location.href = '/editor';
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}