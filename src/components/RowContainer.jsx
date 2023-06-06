import React, { useEffect, useRef, useState } from 'react';
import UnderlineContent from './UnderlineContent';
import {FaChevronLeft} from 'react-icons/fa';
import {FaChevronRight} from 'react-icons/fa';
import {IoBasketSharp} from 'react-icons/io5';
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';

const RowContainer = ({ flag, data }) => {
    const [{cartitems} , dispatch] = useStateValue();
    const [scrolling , setscrolling] = useState(0);
    const navigate = useNavigate()
    const refvalue = useRef();
   
    useEffect(()=>{
        refvalue.current.scrollLeft += scrolling ;
        setscrolling(0)
    },[scrolling])

localStorage.setItem("addcartdata" , JSON.stringify(cartitems))

let savecartitem = async (item)=>{
   await dispatch({
        type : 'SET_CARTITEMS',
        cartitems: [...cartitems , item]
    })
    localStorage.setItem("addcartdata" , JSON.stringify(cartitems))
    navigate('/')
}

    return (
        <div className={`my-16 ${flag? "mx-12" : ""}`}>
            <div className={`${flag ? "" : "hidden"}`}>
               <UnderlineContent content=" Our Fresh And Healthy Fruits"/>
                <div className=' float-right mr-5'>
                    <button onClick={()=>{ setscrolling(-200) }}  className='bg-orange-500 p-5 m-2 rounded-lg'>{<FaChevronLeft/>}</button>
                    <button onClick={()=>{ setscrolling(200) }}  className='bg-orange-500 p-5 m-2 rounded-lg'>{<FaChevronRight/>}</button>
                </div>
            </div>
            <div ref={refvalue}  className={`flex flex-row w-full   ${flag ? "  overflow-x-scroll  scrollbar-hide " : "justify-center items-center  flex-wrap "}`} >
                {data?.map((item) => {
                    return (
                        <div key={item.id} className=' bg-gray-100 w-[300px] h-[350px] flex flex-col items-center justify-between  m-3 relative'>
                            <div className='w-[200px] min-w-[200px] p-3  flex items-center justify-center h-full'>
                                <img src={item.image} alt="" />
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>{item.name}</h1>
                                <h3 className='capitalize text-gray-500'>{item.category}</h3>
                                <h5 className='font-semibold'>${item.price}</h5>
                            </div>
                            <abbr onClick={()=>{ savecartitem(item)}} title='Add to Cart' className='absolute bottom-3 right-3 bg-red-500 rounded-full p-1 hover:p-3'><IoBasketSharp size={28}/></abbr>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RowContainer