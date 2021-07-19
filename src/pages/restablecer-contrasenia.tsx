/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
   () => import('components/RestablecerPasswordComp'),
   {ssr: false, loading: () => <h3 style={{textAlign: 'center'}}>Loading...</h3>}
)
const RestablecerContrasenia: React.FC = () => {
   return (
      <>
         <DynamicComponent />
      </>
   )
}

export default RestablecerContrasenia
