import Link from 'next/link';
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
export const Navigation: React.FC = () => {
   return (
      <Nav>
         <Link href="/" >Inicio</Link>
         <Link href="/create-account" >Populares</Link>
         <Link href="/" >Nuevo Producto</Link>
      </Nav>
   )
}
