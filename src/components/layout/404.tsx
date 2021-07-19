
interface Props {
   msg?: string
}

export const Error404: React.FC<Props> = ({msg = 'No puede visualizar esta pagina'}) => {
   return (
      <div>
         <h2>{msg}</h2>
      </div>
   )
}