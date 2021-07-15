import { Error404 } from 'components/layout/404'
import { Button } from 'components/ui/Button'
import { Campo, InputSubmit } from 'components/ui/Formulario.styles'
import { useGetProduct } from 'hooks/useGetProduct'
import moment from 'moment'
import { useState } from 'react'
import styled from 'styled-components'

// styled Components
const ProductContainer = styled.div`
   @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 1.5rem;
   }
`
const Image = styled.img`
   background: #888;
`

const CreadorProducto = styled.p`
   padding: .5rem 2rem;
   background-color: #DA552F;
   color: #fff;
   text-transform: uppercase;
   font-weight: bold;
   display: inline-block;
   text-align: center;
`
const Comentarios = styled.ul`
   background: #414141;
   li {
      border: 1px solid black;
   }
`

// interface
interface IComentarios {
   mensaje: string,
   userId: string | undefined | null
   userNombre: string | undefined | null

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

   const [comentario, guardarComentario] = useState<IComentarios>({
      mensaje: '',
      userId: null,
      userNombre: null
   })

   // si hay en error redirige a pagina Error404
   if (error) return <Error404 />
   
   // mientras es cargando muestra esto
   if (Object.keys(producto).length === 0) return <h2>Loading...</h2>

   // funcion para votar
   const votarProducto = async () => {
      if (!user) return router.push('/login')

      // obtener y sumar un nuevo voto
      const nuevoTotal = votos + 1

      // verificar si el usuario ya voto
      if (haVotado.includes(user.uid)) return

      // guardar el id del usuario que ha votado
      const nuevoHaVotado = [...haVotado, user.uid]

      // actualizar en la base de datos
      await firebaseDB.db.collection('productos').doc(id).update({
         votos: nuevoTotal,
         haVotado: nuevoHaVotado,
      })

      // actualizar el state
      setProducto({
         ...producto,
         votos: nuevoTotal,
         haVotado: nuevoHaVotado,
      })
   }

   // JP
   const comentarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value)
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
                        <p>Escrito por: {comentario.userNombre}</p>
                        { esCreador( comentario.userId ) && <CreadorProducto>Es Creador</CreadorProducto> }
                     </li>
                  ))}
               </Comentarios>
            </div>
            <aside>
               <Button target="_blank" bgColor={true} href={url}>
                  Visitar Url
               </Button>

               <div>
                  <p>{votos} Votos</p>
                  {user && <Button onClick={votarProducto}>Votar</Button>}
               </div>
            </aside>
         </ProductContainer>
         
         { puedeBorrar() && <Button onClick={eliminarProducto}>Eliminar Producto</Button> }
         
      </div>
   )
}

export default ProductPage
