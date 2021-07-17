import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout/Layout'
import { FirebaseContext, firebaseDB } from 'firebase/index'
import { useVerifyAuth } from 'hooks/useVerifyAuth'
import { ProductContext } from 'context/ProductsContext'
import { useState } from 'react'
import { ProductWithId } from 'types/types'

function MyApp({ Component, pageProps }: AppProps) {

   const {userAuthenticated: user, checking} = useVerifyAuth()
   const [ products, setProducts ] = useState<ProductWithId[]>([])
   const [ noMoreData, setNoMoreData ] = useState(false)
   if(checking) return (<h1>Esperate lambe bicho tamo chekeando cabron</h1>)

   return (
      <FirebaseContext.Provider
         value={{
            firebaseDB,
            user
         }}
      >
         <ProductContext.Provider value={{
            products,
            setProducts,
            noMoreData,
            setNoMoreData

         }}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </ProductContext.Provider>
      </FirebaseContext.Provider>
   )
}
export default MyApp
