import moment from 'moment'
import ImgImage from 'next/image'
import { useState } from 'react'
import { Error404 } from 'components/layout/404'
import { Button } from 'components/ui/Button'
import { Campo, InputSubmit } from 'components/ui/Formulario.styles'
import { Aside } from 'components/[id]/Aside'
import { votar } from 'helpers/votarPorProducto'
import { useGetProduct } from 'hooks/useGetProduct'
import {
   Comentarios,
   CreadorProducto,
   Descripcion,
   ProductContainer,
} from 'components/[id]/[id].styles'
import { SpinnerStyles } from 'components/ui/Spinner.styles'

interface IComentarios {
   mensaje: string
   userId: string | undefined | null
   userNombre: string | undefined | null
}

const initCommentsState: IComentarios = {
   mensaje: '',
   userId: null,
   userNombre: null,
}

// Functional Component
const ProductPage: React.FC = () => {

   const {
      producto,
      error,
      user,
      router,
      firebaseDB,
      setProducto,
      setDbChanged,
   } = useGetProduct()

   const {
      haVotado,
      creado,
      imagen,
      descripcion,
      comentarios,
      url,
      votos,
      creador,
      empresa,
      id,
   } = producto

   const [comentario, guardarComentario] =
      useState<IComentarios>(initCommentsState)

   const [submittingForm, setSubmittingForm] = useState(false)
   const [deletingProduct, setDeletingProduct] = useState(false)

   // si hay en error redirige a pagina Error404
   if (error)
      return (
         <Error404 msg="Chequea tu coneccion a internet e intenta recargar la pagina" />
      )

   // mientras es cargando muestra esto
   if (Object.keys(producto).length === 0)
      return <SpinnerStyles>Loading...</SpinnerStyles>

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

      if (comentario.mensaje.length < 3) return
      setSubmittingForm(true)
      // información extra al comentario
      comentario.userId = user.uid
      comentario.userNombre = user.displayName

      // Tomar copia de comentarios y agregarlos al arreglo
      const nuevosComentarios = [...comentarios, comentario]

      // Actualizar la BD
      await firebaseDB.db.collection('productos').doc(id).update({
         comentarios: nuevosComentarios,
      })
      setSubmittingForm(false)

      // Actualizar el state
      setProducto({
         ...producto,
         comentarios: nuevosComentarios,
      })

      // reiniciar el form
      guardarComentario(initCommentsState)

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
      if (!user) {
         return router.push('/login')
      }

      if (creador.id !== user.uid) {
         return router.push('/')
      }
      setDeletingProduct(true)

      try {
         await firebaseDB.db.collection('productos').doc(id).delete()
         router.push('/')
      } catch (error) {
         // eslint-disable-next-line no-console
         console.log('error eliminando el producto')
      } finally {
         setDeletingProduct(false)
      }
   }

   return (
      <div className="contenedor">
         <ProductContainer>
            <div>
               <h1 style={{ textAlign: 'center' }}>{producto.nombre}</h1>

               <p style={{ color: '#999999' }}>
                  Publicado hace:{' '}
                  {moment(new Date(creado)).startOf('minute').fromNow()}
               </p>

               <p style={{marginBottom: 0}}>
                  Por: <b>{creador.nombre}</b>
               </p>
               <p style={{marginTop: 0}}>
                  Empresa: <b>{empresa}</b>
               </p>

               <div className="img-container">
                  {imagen.length === 0 ? (
                     <p>No hay imagen</p>
                  ) : (
                     // <Image src={imagen} alt="product image"></Image>
                     <ImgImage
                        className="imgnext"
                        src={{ src: imagen, height: 576, width: 1024 }}
                     />
                  )}
               </div>

               <Descripcion>{descripcion}</Descripcion>
               <hr />

               {user && (
                  <>
                     <h3>Agrega tu comentario</h3>
                     <form onSubmit={agregarComentario}>
                        <Campo>
                           <input
                              value={comentario.mensaje}
                              onChange={comentarioChange}
                              type="text"
                              name="mensaje"
                              id="mensaje"
                           />
                        </Campo>
                        {submittingForm ? (
                           <InputSubmit
                              disabled={submittingForm}
                              type="text"
                              value="submitting..."
                           />
                        ) : (
                           <InputSubmit
                              disabled={submittingForm}
                              type="submit"
                              value="agregar comentario"
                           />
                        )}
                     </form>
                  </>
               )}

               {comentarios.length === 0 ? (
                  <h3>Nadie ha comentado aun</h3>
               ) : (
                  <>
                     <h2>Comentarios</h2>
                     <Comentarios>
                        {comentarios.map((comentario, idx) => (
                           <li key={`${comentario.userId}-${idx}`}>
                              <p>{comentario.mensaje}</p>
                              <p>
                                 Escrito por: <b>{comentario.userNombre}</b>
                              </p>
                              {esCreador(comentario.userId) && (
                                 <CreadorProducto>Autor</CreadorProducto>
                              )}
                           </li>
                        ))}
                     </Comentarios>
                  </>
               )}
            </div>

            <Aside
               url={url}
               user={user}
               votos={votos}
               votarProducto={async () => {
                  await votar(
                     user,
                     router,
                     votos,
                     haVotado,
                     firebaseDB,
                     id,
                     producto,
                     setProducto
                  )
               }}
            />
         </ProductContainer>
         <div style={{ marginTop: '1rem' }}>
            {puedeBorrar() &&
               (!deletingProduct ? (
                  <Button onClick={eliminarProducto}>Eliminar Producto</Button>
               ) : (
                  <p>Deleteting</p>
               ))}
         </div>
      </div>
   )
}
export default ProductPage
