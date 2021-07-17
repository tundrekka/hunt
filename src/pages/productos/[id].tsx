import moment from 'moment'
import { useState } from 'react'
import { Error404 } from 'components/layout/404'
import { Button } from 'components/ui/Button'
import { Campo, InputSubmit } from 'components/ui/Formulario.styles'
import { Aside } from 'components/[id]/Aside'
import { votar } from 'helpers/votarPorProducto'
import { useGetProduct } from 'hooks/useGetProduct'
import { Comentarios, CreadorProducto, Image, ProductContainer } from 'components/[id]/[id].styles'

interface IComentarios {
   mensaje: string,
   userId: string | undefined | null
   userNombre: string | undefined | null
}

// Functional Component
const ProductPage: React.FC = () => {
   const {
      producto, error, user, router, firebaseDB,
      setProducto, setDbChanged
   } = useGetProduct()

   const {
      haVotado, creado, imagen, descripcion, comentarios, url,
      votos, creador, empresa, id
   } = producto

   const [comentario, guardarComentario] = useState<IComentarios>({
      mensaje: '',
      userId: null,
      userNombre: null
   })

   // si hay en error redirige a pagina Error404
   if (error) return <Error404 />
   
   // mientras es cargando muestra esto
   if (Object.keys(producto).length === 0) return <h2>Loading...</h2>

   // functions
   const comentarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      guardarComentario({
         ...comentario,
         [e.target.name]: e.target.value,
      })
   }

   // Identifica si el comentario es del creador del producto
   const esCreador = (id: string | null | undefined) => {
      if (id && creador.id === id) {
         return true
      }
   }

   const agregarComentario = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!user) {
         return router.push('/login')
      }

      // información extra al comentario
      comentario.userId = user.uid
      comentario.userNombre = user.displayName

      // Tomar copia de comentarios y agregarlos al arreglo
      const nuevosComentarios = [...comentarios, comentario]

      // Actualizar la BD
      await firebaseDB.db.collection('productos').doc(id).update({
         comentarios: nuevosComentarios,
      })

      // Actualizar el state
      setProducto({
         ...producto,
         comentarios: nuevosComentarios,
      })

      setDbChanged(true) // hay un COMENTARIO, por lo tanto consultar a la BD
   }

   // función que revisa que el creador del producto sea el mismo que esta autenticado
   const puedeBorrar = () => {
      if (!user) return false

      if (creador.id === user.uid) {
         return true
      }
   }

   // eliminar producto
   const eliminarProducto = async () => {

      if(!user) {
         return router.push('/login')
      }

      if(creador.id !== user.uid) {
         return router.push('/')
      }

      try {
         await firebaseDB.db.collection('productos').doc(id).delete();
         router.push('/')
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="contenedor">
         <ProductContainer>
            <div>
               <h1 style={{ textAlign: 'center' }}>{producto.nombre}</h1>
               <p>
                  Publicado hace:{' '}
                  {moment(new Date(creado)).startOf('minute').fromNow()}
               </p>
               <p>
                  Por: {creador.nombre} de - {empresa}
               </p>
               <Image src={imagen} alt="product image"></Image>
               <p>{descripcion}</p>

               {user && (
                  <>
                     <h3>Agrega tu comentario</h3>
                     <form onSubmit={agregarComentario}>
                        <Campo>
                           <input onChange={comentarioChange} type="text" name="mensaje" id="mensaje" />
                        </Campo>
                        <InputSubmit type="submit" value="agregar comentario" />
                     </form>
                  </>
               )}

               <h2>Comentarios</h2>
               <Comentarios>
                  {comentarios.map((comentario, idx) => (
                     <li key={`${comentario.userId}-${idx}`}>
                        <p>{comentario.mensaje}</p>
                        <p>Escrito por: <b>{comentario.userNombre}</b></p>
                        { esCreador( comentario.userId ) && <CreadorProducto>Autor</CreadorProducto> }
                     </li>
                  ))}
               </Comentarios>
            </div>

            <Aside url={url} user={user} votos={votos} votarProducto={() => {
               votar(user, router, votos, haVotado, firebaseDB, id, producto, setProducto)
            }}/>   

         </ProductContainer>
         <div style={{marginTop: '1rem'}}>
            { puedeBorrar() && <Button onClick={eliminarProducto}>Eliminar Producto</Button> }
         </div>
      </div>
   )
}
export default ProductPage
