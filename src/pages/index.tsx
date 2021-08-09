import styled from 'styled-components'
import { ProductDetails } from 'components/inicioPage/ProductDetails'
// import { useProducts } from 'hooks/useProducts'
import { Producto } from 'components/inicioPage/productDetails.styles'
import { PaginationData } from 'components/utils/Pagination'
import { InferGetServerSidePropsType  } from 'next'
import { FirebaseContext, firebaseDB } from 'firebase'
import type { ProductWithId } from 'types/types'
import { IFirebaseSnapShot } from 'types/auth'
import loadDB from 'firebase/loadDB'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from 'context/ProductsContext'
import { IFirebaseClass } from 'firebase/firebase'

const handleSnapshot = (snapShot: IFirebaseSnapShot) => {
   // lastDocument = snapShot.docs[snapShot.docs.length - 1] || null
   const products = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
   }))
   return products as ProductWithId[]
}
export const getServerSideProps = async () => {
   const firebase = await loadDB()
   const db = firebase.firestore()

   let result: ProductWithId[] = await new Promise ((res, rej) => {
      // let resp = []
      db.collection('productos')
         .orderBy('creado', 'desc')
         .limit(5)
         .get()
         .then((snapShot) => {
            const productosResp = handleSnapshot(snapShot)
            res([...productosResp])
         })
         .catch((err) => {
            console.log(err);
            rej([])
         })
   })
   // console.log(result);
 
   return {
     props: {
      result,
     },
   }
 }

const ProductsList = styled.div`
   padding: .5em;
   @media (min-width: 768px) {
      padding: 1em;
   }

   padding-top: 0;
   background-color: #2f2f2f;
`

// , firebasedb: IFirebaseClass
const getProduct = async (id: string | undefined) => {
   const firebase = await loadDB()
   const firebasedb = firebase.firestore()
   const productoQuery = firebasedb.collection('productos').doc(id)
   const productoResp = await productoQuery.get()
   
   if(!productoResp.exists) {
      throw new Error('no existe ese producto')
   } 
   console.log('docsnapshot:', productoResp);
   // giving the object the Type
   // const productTyped = {
   //    ...productoResp.data(),
   //    id: id
   // } as ProductWithId
   return productoResp

}

export default function Home({ result }: InferGetServerSidePropsType<typeof getServerSideProps>) {

   // const products = useProducts('creado')
   const {products,setProducts} = useContext(ProductContext)
   const [last, setLast] = useState<any>('')
   // const { firebaseDB } = useContext(FirebaseContext)

   useEffect(() => {
      setProducts([...result])
      return () => {}
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   useEffect(() => {
      if(result.length > 1) {
         getProduct(result[result.length -1].id).then((product) => {
            console.log('productGetProd: ', product);
            setLast(product)
         })
         
      }
   }, [result]);
   console.log(firebaseDB);

   return (
      <>
         <ProductsList>
            <ul>
               {  
                  (products.length !== 0) ?
                  products.map((product, idx )=> (
                     <ProductDetails product={product}  key={`${product.id}--${idx}`} />
                  ))

                  : (
                     [1,2,3,4].map((item, idx) => (
                        <Producto key={idx} />
                     ))
                  )
               }
            </ul>
            <PaginationData lastDoc={last} />
         </ProductsList>
      </>
   )
}


