import type { NextRouter } from 'next/router'
import type { IFirebaseUser } from 'types/auth'
import type { ProductWithId } from 'types/types'
import type { SetStateAction } from 'react'
import type { IFirebaseClass } from 'firebase/firebase'
export const votar = async (
   user: IFirebaseUser | null,
   router: NextRouter,
   votos: number,
   haVotado: string[],
   firebaseDB: IFirebaseClass,
   id: string,
   producto: ProductWithId,
   setProducto: React.Dispatch<SetStateAction<ProductWithId>>
) => {
   if (!user) return router.push('/login')
   
   // obtener y sumar un nuevo voto
   const nuevoTotal = votos + 1

   // verificar si el usuario ya voto
   if (haVotado.includes(user.uid)) return

   // guardar el id del usuario que ha votado
   const nuevoHaVotado = [...haVotado, user.uid]

   // actualizar en la base de datos
   await firebaseDB.db.collection('productos').doc(id).update({
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
   })

   // actualizar el state
   setProducto({
      ...producto,
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
   })
}
