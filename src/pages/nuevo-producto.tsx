import { useCallback, useContext, useState } from 'react'
import FileUploader from 'react-firebase-file-uploader'

import {
   Formulario,
   Campo,
   InputSubmit,
   Error,
   UploadingMsg,
} from 'components/ui/Formulario.styles'

import type { NewProductForm, Product } from 'types/types'
import { useValidacion } from 'hooks/useValidacion'
import { validateNewProduct } from 'helpers/validationNewProduct'
import { FirebaseContext } from 'firebase/index'
import { useRouter } from 'next/router'
import { Error404 } from 'components/layout/404'
import { SpinnerStyles } from 'components/ui/Spinner.styles'

const initialFormState: NewProductForm = {
   nombre: '',
   empresa: '',
   imagen: '',
   url: '',
   descripcion: ''
}

export default function CreateAccount() {
   
   const { user, firebaseDB } = useContext(FirebaseContext)
   // file upload states
   const [uploading, setUploading] = useState(false)
   const [progress, setProgress] = useState(0)
   const [imageUrl, setImageUrl] = useState('')

   const [submittingForm, setSubmittingForm] = useState(false)
   // end*

   // catching firebase error
   const [errorFirebase, setErrorFirebase] = useState<string | null>(null)

   // formValues
   const { formValues, errors, handleSubmit, handleInputChange, handleBlur } =
      useValidacion(initialFormState, validateNewProduct, createProduct)
   
   const { nombre, empresa, url, descripcion } = formValues

   // createProduct function
   const router = useRouter()
   async function createProduct() {
      if(!user) {
         return router.push('/login')
      }
      setSubmittingForm(true)
      const producto: Product = {
         nombre,
         empresa,
         url,
         imagen: imageUrl,
         descripcion,
         votos: 0,
         comentarios: [],
         creado: Date.now(),
         creador: {
            id: user.uid,
            nombre: user.displayName
         },
         haVotado: []
      }
      try {
         await firebaseDB.db.collection('productos').add(producto)
         return router.push('/')
      } catch (error) {
         // eslint-disable-next-line no-console
         console.log('error subiendo el producto')
         setErrorFirebase(error.message)
      }
      setSubmittingForm(false)
   } // end*

   const handleUploadStart = useCallback(() => {
      setProgress(0)
      setUploading(true)
      },[])

   const handleProgress = useCallback((progress: any) => {
      setProgress(progress)
      }, [])

   const handleUploadError = useCallback(( error: any ) => {
      setUploading(error)
      }, [])
   
   const handleUploadSuccess = useCallback( (nombre: any) => {
      setProgress(100)
      setUploading(false)
      firebaseDB
         .storage
         .ref('productos')
         .child(nombre)
         .getDownloadURL()
         .then((url) => {
            setImageUrl(url)
         })
      }, [firebaseDB.storage]
   )

   if( !user ) return <Error404 /> 

   return (
      <div>
         
         <h2 style={{ textAlign: 'center' }}>Nuevo Producto</h2>
         <Formulario onSubmit={handleSubmit}>

            <fieldset>
               <legend>Informacion General</legend>
            

               <Campo>
                  {errors.nombre && <Error>{errors.nombre}</Error>}
                  <label htmlFor="nombre">Nombre</label>
                  <input
                     type="text"
                     name="nombre"
                     id="nombre"
                     placeholder="nombre"
                     value={nombre}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                  />
               </Campo>

               <Campo>
                  {errors.empresa && <Error>{errors.empresa}</Error>}
                  <label htmlFor="empresa">Empresa</label>
                  <input
                     type="text"
                     name="empresa"
                     id="empresa"
                     placeholder="tu empresa"
                     value={empresa}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                  />
               </Campo>

               <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                     id="imagen"
                     name="imagen"
                     accept="image/*"
                     storageRef={firebaseDB.storage.ref('productos')}
                     onUploadStart={handleUploadStart}
                     onUploadError={handleUploadError}
                     onUploadSuccess={handleUploadSuccess}
                     onProgress={handleProgress}
                     randomizeFilename
                  />
                  { uploading && <UploadingMsg>Uploading...</UploadingMsg> }
                  { (progress === 100) && <UploadingMsg>Done</UploadingMsg> }
               </Campo>

               <Campo>
                  {errors.url && <Error>{errors.url}</Error>}
                  <label htmlFor="url">URL</label>
                  <input
                     type="url"
                     name="url"
                     id="url"
                     value={url}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                  />
               </Campo>

            </fieldset>

            <fieldset>
               <legend>Sobre tu producto</legend>
               <Campo>
                  {errors.descripcion && <Error>{errors.descripcion}</Error>}
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea
                     name="descripcion"
                     id="descripcion"
                     value={descripcion}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                  />
               </Campo>
            </fieldset>

            {errorFirebase && <Error>{errorFirebase}</Error>}
            {submittingForm && <SpinnerStyles m="50px">Loading...</SpinnerStyles>}
            <InputSubmit disabled={submittingForm || uploading} type="submit" value="Crear Producto" />
         </Formulario>
      </div>
   )
}
