import React from 'react'
import "./index.css"
interface IProps {
    children: React.ReactNode;
}
const Modal: React.FC<IProps> = ({children}) => {
  return (
    <div className='modal'>{children}</div>
  )
}

export default Modal