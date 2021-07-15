import firebase from 'firebase/app'
export type IFirebaseUser = firebase.User
export type IFirebaseSnapShot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
export type IFirebaseDocumentSnapShot = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>