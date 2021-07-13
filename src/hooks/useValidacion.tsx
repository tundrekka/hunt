import { useEffect, useState } from 'react'

// GenericType
type IUseValidacionReturnValues<T, Y> = {
   formValues: T
   errors: Y
   submitForm: boolean
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useValidacion = <T, Y>(
   initialFormState: T,
   validar: (arg: T) => Y,
   callback: () => any
): IUseValidacionReturnValues<T, Y> => {
   
   const [formValues, setFormValues] = useState(initialFormState)
   const [errors, setErrors] = useState<Y>({} as Y)
   const [submitForm, setSubmitForm] = useState(false)

   useEffect(() => {
      if (submitForm) {
         const noErrors = Object.keys(errors).length === 0
         if (noErrors) {
            callback()
         }
         setSubmitForm(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [submitForm])

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({
         ...formValues,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const erroresValidacion = validar(formValues)
      setErrors(erroresValidacion)
      setSubmitForm(true)
   }

   return {
      formValues,
      errors,
      submitForm,
      handleSubmit,
      handleInputChange,
   }
}
