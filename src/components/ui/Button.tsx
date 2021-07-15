import styled from 'styled-components'
interface ButtonProps {
   bgColor?: boolean 
}
export const Button = styled.a<ButtonProps>`
   text-align: center;
   display: block;
   font-weight: 700;
   text-transform: uppercase;
   border: 1px solid #d1d1d1;
   padding: .8rem 2rem;
   margin-right: 1rem auto;
   background-color: ${ props => props.bgColor ? '#DA552F' : 'white'};
   color: ${ props => props.bgColor ? 'white' : '#000'};
   user-select: none;
   cursor: pointer;

   &:last-of-type {
      margin-right: 0;
   }

   &:hover {
      opacity: .85;
   }

`


