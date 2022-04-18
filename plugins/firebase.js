import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "AIzaSyBlKYTWEjOI81Sc5RbQKWoZyeFbINU6bTU",
        authDomain: "advance-e6c83.firebaseapp.com",
        projectId: "advance-e6c83",
        storageBucket: "advance-e6c83.appspot.com",
        messagingSenderId: "8711454095",
        appId: "1:8711454095:web:b370b2eb7ced9d2cc01ffa",
        measurementId: "G-6E2N7X6KQW"
    }
  )
}
  
export default firebase