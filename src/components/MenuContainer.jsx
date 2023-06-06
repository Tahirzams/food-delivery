import React, { useState } from 'react'
import UnderlineContent from './UnderlineContent'
import { useStateValue } from '../context/StateProvider';
import { MdFastfood } from 'react-icons/md'
import RowContainer from './RowContainer';

const MenuContainer = () => {
    let [{ items }, dispatch] = useStateValue();
    let [cat, setcat] = useState('chicken')
    let fltritems = items?.map((item) => {
        return item.category
    })
    let unique = [...new Set(fltritems)]

    return (
        <div className='mt-5 mx-12 '>
            <UnderlineContent content="Our Hot Menu" />
            <div className='flex flex-row justify-center w-full my-5 ' >
                <div className={` ${cat === 'all' ? "bg-red-600 text-white  scale-105" : ""} mx-3 shadow-sm  shadow-gray-400  p-3 px-5 flex  items-center justify-between flex-col w-24 h-28 rounded-lg font-semibold text-lg hover:bg-red-400 hover:text-gray-300 parent`}
                    onClick={() => setcat('all')} >
                    <span className='childFood bg-red-500 p-3 rounded-full text-white'> <MdFastfood size={'26px'} /> </span>
                    <span> All </span>
                </div>
                {unique?.map((item, ind) => {
                    return (
                        <div key={ind} className={` ${cat === item ? "bg-red-600 text-white  scale-105" : ""} mx-3 shadow-sm  shadow-gray-400  p-3 px-5 flex  items-center justify-between flex-col w-24 h-28 rounded-lg font-semibold text-lg hover:bg-red-400 hover:text-gray-300 parent`}
                            onClick={() => setcat(item)} >
                            <span className='childFood bg-red-500 p-3 rounded-full text-white'> <MdFastfood size={'26px'} /> </span>
                            <span>   {item}  </span>
                        </div>
                    )
                })}
            </div>
            <RowContainer data={items?.filter((item) => {
                if (item.category === cat) {
                    return item
                }
                if (cat === 'all') {
                    return items
                }
            })
            } />
        </div>
    )
}

export default MenuContainer