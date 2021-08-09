import loadDB from "firebase/loadDB"

export const getProductId = async (id: string | undefined) => {
   const firebase = await loadDB()
   const firebasedb = firebase.firestore()
   const productoQuery = firebasedb.collection('productos').doc(id)
   const productoResp = await productoQuery.get()
   
   if(!productoResp.exists) {
      throw new Error('no existe ese producto')
   } 
   return productoResp

}