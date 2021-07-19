import styled from 'styled-components'

export const Producto = styled.li`
   padding: 1.6rem 0;
   display: flex;
   min-height: 155px;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid #a5a5a5d5;
   /* margin-bottom: 10px; */
   .imgnext {
      box-shadow: -1.5px 1.5px 3px rgba(0,0,0,.9);
      object-fit: cover;
      border-radius: 3.5px;
   }
`

export const DescripcionProducto = styled.div`
   display: flex;
   align-items: center;
   & > div.img {
      box-shadow: -1.5px 1.5px 3px rgba(0,0,0,.9);
      border-radius: 5px;
      width: 90px;
      @media (min-width: 768px) {
         width: 150px;
      }

      line-height: 0;
      flex-shrink: 0;
      margin-right: 12px;
   }
`

export const Imagen = styled.img`
   border-radius: 3.5px;
   box-shadow: -1.5px 1.5px 3px rgba(0,0,0,.9);
   width: 90px;
   height: 90px;
   object-fit: cover;
   @media (min-width: 768px) {
      width: 150px;
      height: 150px;
   }
`

export const Titulo = styled.a`
   font-size: 1.7rem;
   font-weight: bold;
   margin: 0;
   display: inline-block;
   margin-bottom: 10px;

   cursor: pointer;
`

export const TextoDescripcion = styled.p`
   font-size: 1.4rem;
   color: #b1b1b1;
   margin: 0 0 12px;
   margin-right: 8px;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   text-overflow: ellipsis;
   overflow: hidden;
   word-break: break-all;
`

export const Comentarios = styled.div`
   margin-top: .75em;
   margin-bottom: 8px;
   display: flex;
   align-items: center;
   div {
      display: flex;
      align-items: center;
      padding: .3rem 1rem;
      margin-right: 1.5rem;
       
   }
   p {
      font-size: 1.3rem;
      margin-right: 1rem;
      font-weight: 700;
      &:last-of-type {
         margin: 0;
      }
   }
`
export const ComentariosIcon = styled.img`
   width: 18px;
   margin-right: 2rem;
`

export const Votos = styled.div`
   flex: 0 0 auto;
   text-align: center;
   border-right: 1px solid #424242;
   padding: 1rem 1.5rem;

   div, p {
      font-size: 1.5rem;
   }
   p {
      margin: 0;
      font-weight: 700;
   }
`