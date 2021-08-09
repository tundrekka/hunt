import { IFirebaseSnapShot } from "types/auth"
import { ProductWithId } from "types/types"

export const handleSnapshot = (snapShot: IFirebaseSnapShot) => {
   // lastDocument = snapShot.docs[snapShot.docs.length - 1] || null
   const products = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
   }))
   return products as ProductWithId[]
}