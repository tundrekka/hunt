import { FirebaseContext } from 'firebase/index';
import Link from 'next/link';
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
`
FirebaseContext
export const Navigation: React.FC = () => {

   const { user } = useContext(FirebaseContext)

   return (
      <Nav>
         <Link href="/" >Inicio</Link>
         <Link href="/create-account" >Populares</Link>
         
         {
            user && (
               <Link href="/" >Nuevo Producto</Link>
            )
         }
      </Nav>
   )
}
