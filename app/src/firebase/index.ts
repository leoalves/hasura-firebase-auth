import * as firebase from 'firebase'

// Firebase config variable. Get this data from the Firebase Console
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
