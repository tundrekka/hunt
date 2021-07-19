import { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'


import { Button } from 'components/ui/Button'
import { FirebaseContext } from 'firebase/index'
import { MobileNavigation } from './MobileNavigation'
import { useRouter } from 'next/router'

const HeaderContainer = styled.div`
   max-width: 1200px;
   width: 95%;
   margin: 0 auto;
   text-align: center;

   & > div {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      align-items: center;
      justify-content: space-between;

   }
`
const Logo = styled.a`
   color: var(--orange);
   font-size: 4rem;
   line-height: 0;
   font-weight: 700;
`

const TextLink = styled.button`
   border: none;
   background: transparent;
   font-size: 1.5rem;
   padding: .5em;
   color: white;
   cursor: pointer;

`

export const MobileHeader: React.FC = () => {
   const {user, firebaseDB} = useContext(FirebaseContext);
   const router = useRouter()
   return (
      <header
         style={{
            borderBottom: '2px solid black',
            padding: '1rem 0',
         }}
      >
         <HeaderContainer>
            <div>
               <MobileNavigation />
               <Link href="/" passHref>
                  <Logo>
                     <p>Logo</p>
                  </Logo>
               </Link>

               {/* menu administracion */}
               {
                  user
                  ? (
                     <>
                        <TextLink
                           onClick={() => {
                              firebaseDB.loggout()
                              router.replace('/')
                           }}
                        >Cerrar sesion</TextLink>
                     </>
                  )
                  : (
                     <>
                        <Link href="/login" passHref>
                           <Button bgColor={true}>Login</Button>
                        </Link>
                     </>
                  )
               }
            </div>

            {/* right side of navbar */}
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center'
               }}
            >

               

            </div>
         </HeaderContainer>
      </header>
   )
}
