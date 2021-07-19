import type { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './Header'
import { MobileHeader } from './MobileHeader'
import Head from 'next/head'
const GlobalStyles = createGlobalStyle`
   :root {
      --gray: #3d3d3d;
      --gray-light: #6F6F6F;
      /* --orange: #DA552F; */
      --orange: limegreen;
   }

   html {
      font-size: 62.5%;
      box-sizing: border-box;
      background-color: #1d1d1d;
      color: rgb(245, 245, 245);
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
         Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
   }
   * {
      box-sizing: border-box;
   }
   *, *:before, *:after {
      box-sizing: inherit;
   }
   body {
      font-size: 1.6rem;
      line-height: 1.5;
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
         Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

   img {
      max-width: 100%;
   }
   a {
      color: inherit;
      text-decoration: none;
   }

   // scrollbar styles
   ::-webkit-scrollbar {
      -webkit-appearance: none;
   }

   ::-webkit-scrollbar-thumb {
      background-color: #686868;
   }

   ::-webkit-scrollbar-track {
      background: #424242;  
   }

`
const Container = styled.div`
   max-width: 1200px;
   width: 95%;
   padding: 5rem 0;
   padding-top: 3.5rem;
   margin: 0 auto;
`

export const Layout: FC = ({children}) => {
   return (
      <>
         <GlobalStyles />
         <Head>
            <title>Hunt</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>

         {
            (window.innerWidth > 768) 
            ? <Header />
            : <MobileHeader />
         }
         
         <main>
            <Container>
               {children}
            </Container>
         </main>
      </>
   )
}
