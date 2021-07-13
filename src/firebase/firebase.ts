import app from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './config'

class Firebase {

   auth: app.auth.Auth;
   
   constructor() {
      if(!app.apps.length) {
         app.initializeApp(firebaseConfig)
      }
      this.auth = app.auth()
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
}

export const firebaseDB = new Firebase()

export interface IFirebaseClass extends Firebase {}