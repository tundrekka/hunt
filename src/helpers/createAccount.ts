import type { SetStateAction } from 'react'
import Router from 'next/router'
import { firebaseDB } from 'firebase/index'
import { isFirebaseError } from './isFirebaseError'

export const crearCuenta = async (
   nombre: string,
   email: string,
   password: string,
   setErrorFirebase: React.Dispatch<SetStateAction<string | null>>
) => {
   try {
      await firebaseDB.registrar(nombre, email, password)
      console.log('creado user')
      setErrorFirebase(null)
      Router.push('/')

   } catch (error) {

      console.error('hubo un error con firebase')
      if(isFirebaseError(error)) {
         setErrorFirebase(error.message)
      }
   }
}
