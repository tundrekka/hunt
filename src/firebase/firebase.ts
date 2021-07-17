import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from './config'

class Firebase {

   auth: app.auth.Auth;
   db: app.firestore.Firestore
   storage: app.storage.Storage
   
   constructor() {
      if(!app.apps.length) {
         app.initializeApp(firebaseConfig)
      }
      this.auth = app.auth()
      this.db = app.firestore()
      this.storage = app.storage()
   }

   // register an user
   async registrar(nombre: string, email: string, password: string) {
      const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
      return await newUser.user?.updateProfile({
         displayName: nombre
      })
   }

   // login user
   async login(email: string, password: string) {
      return await this.auth.signInWithEmailAndPassword(email, password)
   }

   // loggout
   async loggout() {
      await this.auth.signOut()
   }

   // restablecer contrasenia
   async startNewPassword(email: string) {
      return await this.auth.sendPasswordResetEmail(email)
   }
}

export const firebaseDB = new Firebase()

export interface IFirebaseClass extends Firebase {}