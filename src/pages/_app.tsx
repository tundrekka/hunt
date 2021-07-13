import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout/Layout'
import firebase ,{ FirebaseContext } from 'firebase/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseContext.Provider value={{
      firebase
    }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseContext.Provider>
  )
}
export default MyApp
