// @ts-ignore
import firebase from 'firebase/app'

import 'firebase/auth'

import config from '../constants/firebase-config'
import User from '../classes/User'
import { store } from '../store'
import { UPDATE_USER } from '../actions/user'

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function(user: any) {
  if (user) {
    store.dispatch({
      type: UPDATE_USER,
      user: new User(user.displayName, user.email, user.photoUrl)
    })
  } else {
    // No user is signed in.
  }
})

export const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  try {
    const { user } = await firebase.auth().signInWithPopup(provider)

    return (user as unknown) as {
      displayName: string
      email: string
      photoUrl: string
    }
  } catch (e) {
    throw new Error('Sign-in failed')
  }
}
