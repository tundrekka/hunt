import type { FC } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Header } from './Header'

const GlobalStyles = createGlobalStyle`
   :root {
      --gray: #3d3d3d;
      --gray-light: #6F6F6F;
      --orange: #DA552F;
   }

   html {
      font-size: 62.5%;
      box-sizing: border-box;
      background-color: #1d1d1d;
      color: rgb(245, 245, 245);
   }
   *, *:before, *:after {
      box-sizing: inherit;
   }
   body {
      font-size: 1.6rem;
      line-height: 1.5;
   }
   h1,h2,h3 {
      margin: 0 0 2rem 0;
      line-height: 1.5;
   }

   ul {
      list-style: none;
      margin: 0;
      padding: 0;
   }

`

export const Layout: FC = ({children}) => {
   return (
      <>
         <GlobalStyles />

         <Header />
         
         <main>
            {children}
         </main>
      </>
   )
}
