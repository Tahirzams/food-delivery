import React from 'react';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
const HorizontalScroll = () => {
  let [{items} , dispatch] = useStateValue()

  return (
      <div className=' w-full'>
      <RowContainer flag={true} data={items?.filter((item)=> item.category == "fruits")} /> 
      </div>
  )
}

export default HorizontalScroll