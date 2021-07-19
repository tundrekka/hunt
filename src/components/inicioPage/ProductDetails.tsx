// import { LazyLoad } from 'components/LazyLoad'
import moment from 'moment'
import Link from 'next/link'
import ImgImage from 'next/image'
import { ProductWithId } from 'types/types'
import {
   Producto, DescripcionProducto, Titulo, TextoDescripcion,
   Comentarios,
   ComentariosIcon,
   Votos,
} from './productDetails.styles'


interface Props {
   product: ProductWithId
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
   const {
      nombre, imagen, descripcion, creado,
      comentarios, votos, id
   } = product

   return (
      <Producto>
         <DescripcionProducto>
            <div className="img">
               {/* <LazyLoad> */}
                  {
                     (imagen.length === 0)
                     ? (
                        <p style={{textAlign: 'center', color: '#686868'}}>No image</p>
                     )
                     : (
                        <ImgImage className="imgnext" src={{src: imagen, height: 150, width: 150}}/>
                        // <Imagen src={imagen} alt="product img" />
                     )
                  }
                  
               {/* </LazyLoad> */}
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
