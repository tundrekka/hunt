import { FirebaseContext } from 'firebase/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
   padding-left: 2rem;

   a {
      font-size: 1.8rem;
      margin-left: 2rem;
      color: var(--gray2);
      &:last-of-type {
         margin-right: 0;
      }
   }
  .activeClass > a{
      color: limegreen;
      font-weight: 600;
   }
`
export const Navigation: React.FC = () => {
   const router = useRouter()
   const { user } = useContext(FirebaseContext)

   return (
      <Nav>
         <span className={router.pathname == "/" ? "activeClass" : ""}>
            <Link href="/" >Inicio</Link>
         </span>
         <span className={router.pathname == "/populares" ? "activeClass" : ""}>
            <Link href="/populares" >Populares</Link>
         </span>
         
         {
            user && (
               <span className={router.pathname == "/nuevo-producto" ? "activeClass" : ""}>
                  <Link href="/nuevo-producto" >Nuevo Producto</Link>
               </span>
            )
         }
      </Nav>
   )
}
