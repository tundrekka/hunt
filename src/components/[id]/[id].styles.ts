import styled from "styled-components"

// styled Components
export const ProductContainer = styled.div`
   @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2.5fr 1fr;
      column-gap: 1.5rem;
   }
`
export const Image = styled.img`
   background: #888;
`

export const CreadorProducto = styled.p`
   padding: .25rem 1rem;
   background-color: #DA552F;
   color: #fff;
   text-transform: uppercase;
   font-weight: bold;
   font-size: 1.2rem;
   display: inline-block;
   text-align: center;
   margin: 0 auto;
`
export const Comentarios = styled.ul`
   li {
      background: #333333;
      padding: .5rem;
      border: 1px solid #000000b9;
      margin-bottom: 2px;
      p {
         margin: 0;
         margin-bottom: .5rem;
      }
   }
`
