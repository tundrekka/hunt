import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { FirebaseContext, firebaseDB } from 'firebase/index'
import { useVerifyAuth } from 'hooks/useVerifyAuth'
import { ProductContext } from 'context/ProductsContext'
import { ProductWithId } from 'types/types'
import { SpinnerStyles } from 'components/ui/Spinner.styles'

function MyApp({ Component, pageProps }: AppProps) {

   const {userAuthenticated: user, checking} = useVerifyAuth()
   const [ products, setProducts ] = useState<ProductWithId[]>([])
   const [ noMoreData, setNoMoreData ] = useState(false)
   const [ loadingSSR, setLoadingSSR ] = useState(false)

   return (
      <FirebaseContext.Provider
         value={{
            firebaseDB,
            user
         }}
      >
         <Head>
            <style>
               {`
                  body, html {
                     padding: 0;
                     margin: 0;
                  }`
               }
            </style>
         </Head>
         {
            checking ? (
               <div style={{
                  background: '#1d1d1d',
                  minHeight:' 100vh',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
               }}>
                  <SpinnerStyles>Loading...</SpinnerStyles>
               </div>
            )

            : (
               <ProductContext.Provider value={{
                  products,
                  setProducts,
                  noMoreData,
                  setNoMoreData,
                  loadingSSR,
                  setLoadingSSR,
               }}>
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </ProductContext.Provider>
            )
         }      
         

      </FirebaseContext.Provider>
   )
}
export default MyApp
