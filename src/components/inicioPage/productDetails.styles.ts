import styled from 'styled-components'

export const Producto = styled.li`
   padding: 2.5rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid green;
`

export const DescripcionProducto = styled.div`
   flex: 0 1 600px;
   display: grid;
   grid-template-columns: 1fr 3fr;
   column-gap: 1em;
`

export const Imagen = styled.img`
   width: 200px;
`

export const Titulo = styled.span`
   font-size: 2.5rem;
   font-weight: bold;
   margin: 0;

   cursor: pointer;
`

export const TextoDescripcion = styled.p`
   font-size: 1.6rem;
   margin: 0;
   color: #b1b1b1;
`

export const Comentarios = styled.div`
   margin-top: 1.52em;
   display: flex;
   align-items: center;
   div {
      display: flex;
      align-items: center;
      border: 1px solid yellow;
      padding: .3rem 1rem;
      margin-right: 1.5rem;
       
   }
   p {
      font-size: 1.6rem;
      margin-right: 1rem;
      font-weight: 700;
      &:last-of-type {
         margin: 0;
      }
   }
`
export const ComentariosIcon = styled.img`
   width: 2em;
   margin-right: 2rem;
`

export const Votos = styled.div`
   flex: 0 0 auto;
   text-align: center;
   border: 1px solid orange;
   padding: 1rem 1.5rem;

   div {
      font-size: 2rem;
   }
   p {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
   }
`