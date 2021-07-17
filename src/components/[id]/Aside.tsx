import { Button } from "components/ui/Button"
import styled from "styled-components"
import type {IFirebaseUser} from 'types/auth'

const StickyButton = styled.div`
   margin-top: 1rem;
   @media (min-width: 768px) {
      position: sticky;
      top: 25px;
      margin-top: 2rem;
   }
`

interface Props {
   url: string
   votos: number
   user: IFirebaseUser | null
   votarProducto(): void
}

export const Aside: React.FC<Props> = ({url, user, votos, votarProducto}) => {
   return (
      <aside>
         <div>
            <p>{votos} Votos</p>
            {user && <Button onClick={votarProducto}>Votar</Button>}
         </div>

         <StickyButton>
            <Button target="_blank" bgColor={true} href={url}>
               Visitar Url
            </Button>
         </StickyButton>
      </aside>
   )
}