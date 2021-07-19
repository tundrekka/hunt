import { HamburguerIcon } from 'components/ui/HamburgerIcon';
import { FirebaseContext } from 'firebase/index';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
   /* padding-left: 2rem; */
   position: relative;
   a {
      font-size: 1.8rem;
      /* margin-left: 2rem; */
      color: var(--gray2);
      &:last-of-type {
         margin-right: 0;
      }
   }
`

const ButtonUnstyled = styled.button`
   border: none;
   background-color: transparent;
   cursor: pointer;
`

const HamburgerMenu = styled.div`
   position: absolute;
   background-color: rgba(25, 29, 24, 0.989);
   width: 75vw;
   height: 100vh;
   top: 7.1rem;
   /* bottom: 25px; */
   transform: translateX(-125%);
   z-index: 50;
   display: flex;
   flex-direction: column;
   transition: transform .25s ease;
   border-radius: 5px;

   &.show {
      transform: translateX(-5%);
   }
   a {
      padding: .5em;
      &:first-of-type {
         margin-top: 6px;
      }
      border-bottom: .5px solid rgba(245, 245, 245, 0.5);
   }
`

export const MobileNavigation: React.FC = () => {

   const [showMenu, setshowMenu] = useState(false)

   const buttonRef = useRef<null | HTMLButtonElement>(null)

   const { user } = useContext(FirebaseContext)
   const onBlurFn = () => {
      setTimeout(() => {
         setshowMenu( false )
      }, 20);
   }
   useEffect(() => {
      const copyButtonRef = buttonRef.current
      copyButtonRef?.addEventListener('blur', onBlurFn)
      return () => {
         copyButtonRef?.removeEventListener('blur', onBlurFn)
      }
   }, [])

   return (
      <Nav>
         <ButtonUnstyled ref={buttonRef} onClick={() => {
            setshowMenu(!showMenu)
         }}>
            <HamburguerIcon />
         </ButtonUnstyled>
         <HamburgerMenu className={`${showMenu ? 'show' : ''}`}>
            <>
               <Link href="/" ><a>Inicio</a></Link>
               <Link href="/populares" ><a>Populares</a></Link>
            </>
            {
               user && (
                  <Link href="/nuevo-producto" >Nuevo Producto</Link>
               )
            }
         </HamburgerMenu>
      </Nav>
   )
}
