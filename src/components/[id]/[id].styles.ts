import styled from "styled-components"

// styled Components
export const ProductContainer = styled.div`
   @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2.5fr 1fr;
      column-gap: 1.5rem;
   }

   .img-container {
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 0;
      width: 100%;
      background: #414141;
   }
   .imgnext {
      box-shadow: -1px 1px 3px rgba(0,0,0,.9);
      object-fit: cover;
      object-position: center center;
   }
`
export const Image = styled.img`
   background: #414141;
   /* height: 50vh; */
   /* min-height: 200px; */
   /* width: 100%; */
`

export const Descripcion = styled.p`
   white-space: pre-line;
   color: #cfcfcf;
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
