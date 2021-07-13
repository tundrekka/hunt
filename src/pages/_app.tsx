import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout/Layout'
import { FirebaseContext, firebaseDB } from 'firebase/index'
import { useVerifyAuth } from 'hooks/useVerifyAuth'

function MyApp({ Component, pageProps }: AppProps) {

   const {userAuthenticated: user, checking} = useVerifyAuth()
   
   if(checking) return (<h1>Esperate lambe bicho tamo chekeando cabron</h1>)

   return (
      <FirebaseContext.Provider
         value={{
            firebaseDB,
            user
         }}
      >
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </FirebaseContext.Provider>
   )
}
export default MyApp
