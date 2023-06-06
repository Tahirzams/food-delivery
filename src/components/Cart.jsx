import React from 'react';
import { BiArrowBack } from 'react-icons/bi'
import { TbGardenCartOff } from 'react-icons/tb'
import {FaMinus} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import additemimage from '../assets/img/emptyCart.svg';

const Cart = () => {
    let [{ cart, cartitems }, dispatch] = useStateValue();
    let subtotal = 0;
    let deliveryprice = 10
    let navigate = useNavigate()

    let closeCart = () => {
        dispatch({
            type: "SET_CART",
            cart: false
        })
    }

    let increase = async (id, event) => {
        let updatecart = await cartitems.map((item) => {
            if (item.id === id) {
                if (event === "plus") {
                    return { ...item, qty: item.qty + 1 }
                } else {
                    return { ...item, qty: item.qty - 1 }
                }
            }
            return item
        }).filter((item) => {
            return item.qty >= 1
        })
        dispatch({
            type: 'SET_CARTITEMS',
            cartitems: updatecart
        })
        localStorage.setItem('addcartdata', JSON.stringify(updatecart))
    }

    let removeitem = async (id) => {
        let updatecart = await cartitems.filter((item) => {
            return item.id != id
        })
        dispatch({
            type: 'SET_CARTITEMS',
            cartitems: updatecart
        })
        localStorage.setItem('addcartdata', JSON.stringify(updatecart))
    }
    let clearcart = ()=>{
        if(cartitems.length >= 1){
            dispatch({
                type:'SET_CARTITEMS',
                cartitems: []
            })
            localStorage.setItem('addcartdata' , JSON.stringify(clearcart))
        }
    }

    return (
        <div className=' fixed top-0 right-0 h-screen shadow-lg shadow-gray-600 w-screen w-[400px] bg-white z-20 '>
            {/* cart header */}
            <div className=' bg-white h-[10vh] flex felx-row justify-between items-center px-3'>
                <span className='cursor-pointer' onClick={closeCart}><BiArrowBack size={30} /></span>
                <span className='font-semibold text-xl cursor-default'>Cart</span>
                <div onClick={clearcart} className='flex items-center bg-gray-300 p-2 '><span className='px-1 cursor-pointer'>Clear</span> <TbGardenCartOff /></div>
            </div>
            {/* cart items */}
            {
                cartitems.length >= 1 ?
                    <div>
                        <div className='bg-gray-900 h-[47vh] rounded-t-2xl p-4 overflow-y-scroll  flex flex-col gap-4 pb-10'>

                            {cartitems.map((item) => {
                                subtotal = subtotal + (item.qty * item.price)
                                return (
                                    <div key={item.id} className='flex flex-row justify-between items-center  bg-gray-800 w-[100%] px-1 rounded-2xl text-white'>
                                        <div className='w-[25%] h-28 flex items-center '>
                                            <img className='w-20 rounded-full ' src={item.image} alt="" />
                                        </div>
                                        <div className='w-[45%]'>
                                            <p>{item.name}</p>
                                            <p className='py-[2px] text-md'>${item.price * item.qty}</p>
                                            <span onClick={() => removeitem(item.id)} className='bg-red-500 px-3 py-1 rounded-2xl float-right text-gray-100 text-md font-medium mr-2 cursor-pointer'> Remove</span>
                                        </div>
                                        <div className='w-[30%] flex justify-between px-4'>
                                            <span className='flex items-center cursor-pointer' onClick={() => { increase(item.id, 'minus') }}><FaMinus size={12}/></span>
                                            <span className=' cursor-default'>{item.qty}</span>
                                            <span className='flex items-center cursor-pointer' onClick={() => { increase(item.id, 'plus') }}><FaPlus size={12}/></span>
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </div>
                        {/* cart payment */}
                        <div className='bg-gray-800 h-[46vh] rounded-t-2xl relative -top-[3vh] p-4 flex flex-col justify-center'>
                            <div className=' px-3 flex justify-between text-gray-500 font-semibold text-2xl my-2'>
                                <p className='cursor-default'>Sub Total </p>
                                <p className='cursor-default'>${subtotal}</p>
                            </div>
                            <div className=' px-3 flex justify-between text-gray-500 font-semibold text-2xl my-2'>
                                <p className='cursor-default'>Delivery </p>
                                <p className='cursor-default'>${subtotal > 0 ? deliveryprice : 0}</p>
                            </div>
                            <hr />
                            <div className=' px-3 flex justify-between text-gray-300 font-semibold text-2xl my-8'>
                                <p className='cursor-default'>Total </p>
                                <p className='cursor-default'>${subtotal > 0 ? subtotal + deliveryprice : 0}</p>
                            </div>
                            <div className='flex justify-center'>
                                <button className='text-gray-300 bg-orange-600 px-24 py-4 rounded-full font-semibold text-lg'>Check Out</button>
                            </div>
                        </div>
                    </div> :
                    <div className='flex flex-col items-center justify-center mt-12'>
                        <img src={additemimage} alt="img" />
                        <h1 className='capitalize text-3xl text-center font-semibold mt-10' >Cart is Empty <br /> Please Add some Items to your cart</h1>
                    </div>
            }
        </div>
    )
}

export default Cart