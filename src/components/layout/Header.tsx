import styled from 'styled-components'

import Link from 'next/link'

import { Navigation } from './Navigation'
import { Button } from 'components/ui/Button'
import { Searcher } from 'components/ui/Searcher'

const HeaderContainer = styled.div`
   max-width: 1200px;
   width: 95%;
   margin: 0 auto;
   @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;
   }
`
const Logo = styled.a`
   color: var(--orange);
   font-size: 4rem;
   line-height: 0;
   font-weight: 700;
   margin-right: 2rem;
`

export const Header: React.FC = () => {

   const user = false;

   return (
      <header
         style={{
            borderBottom: '2px solid black',
            padding: '1rem 0',
         }}
      >
         <HeaderContainer>
            <div 
               style={{
                  display: 'flex',
                  alignItems: 'center'
               }}
            >
               <Link href="/" passHref>
                  <Logo>
                     <p>Logo</p>
                  </Logo>
               </Link>

               <Searcher />

               <Navigation />
            </div>

            {/* right side of navbar */}
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center'
               }}
            >
               {/* menu administracion */}

               {
                  user
                  ? (
                     <>
                        <p>Hola: ismael</p>
                        <Button>cerrar sesion</Button>
                     </>
                  )
                  : (
                     <>
                        <Link href="/login" passHref>
                           <Button bgColor={true}>Login</Button>
                        </Link>
      
                        <Link href="/create-account" passHref>
                           <Button>Crear Cuenta</Button>
                        </Link>
                     </>
                  )
               }
               

              

            </div>
         </HeaderContainer>
      </header>
   )
}
