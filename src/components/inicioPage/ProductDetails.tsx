import { LazyLoad } from 'components/LazyLoad'
import moment from 'moment'
import Link from 'next/link'
import { ProductWithId } from 'types/types'
import {
   Producto, DescripcionProducto, Imagen, Titulo, TextoDescripcion,
   Comentarios,
   ComentariosIcon,
   Votos,
} from './productDetails.styles'


interface Props {
   product: ProductWithId
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
   const {
      nombre, empresa, imagen, descripcion, creado,
      url, comentarios, votos, id
   } = product

   return (
      <Producto>
         <DescripcionProducto>
            <div className="img">
               <LazyLoad>
                  <Imagen src={imagen} alt="imagen" />
               </LazyLoad>
            </div>
            <div>
               <Link passHref href="/productos/[id]" as={`/productos/${id}`}>
                  <Titulo>{`${nombre[0].toUpperCase()}${nombre.slice(1, nombre.length)}`}</Titulo>
               </Link>
               <TextoDescripcion>{descripcion}</TextoDescripcion>

               <Comentarios>
                  <div>
                     <ComentariosIcon
                        src="/static/img/comentario.png"
                        alt="dfd"
                     />
                     <p>{comentarios.length} Comentarios</p>
                  </div>
               </Comentarios>
               <p style={{fontSize: '1.3rem', margin: '0'}}>
                  Publicado hace:{' '}
                  {moment(new Date(creado)).startOf('minute').fromNow()}
               </p>
            </div>
         </DescripcionProducto>
         <Votos>
            <div> &#9650; </div>
            <p>{votos}</p>
         </Votos>
      </Producto>
   )
}
