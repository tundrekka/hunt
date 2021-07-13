import {createContext} from 'react'
import type { IFirebaseClass } from 'firebase/firebase'
import type { IFirebaseUser } from 'types/auth'
export interface IContext {
   firebaseDB: IFirebaseClass,
   user: IFirebaseUser | null
}

export const FirebaseContext = createContext<IContext>({} as IContext)
