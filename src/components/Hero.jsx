import React from 'react';
import bikeImage from '../assets/img/delivery.png';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import herobg from '../assets/img/heroBg.png';
import HeroCart from '../utils/HeroCart';

const Hero = () => {
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2'>
            <div className='p-2 mx-3 '>1
                <div className='flex items-center shadow-md rounded-lg w-[230px] bg-blue-100 mt-10 ml-8 lg:ml-16 mb-8 hover:w-[340px] justify-between  transition-all duration-700  '>
                    <p className='text-gray-600 text-xl mx-3 font-bold'>Bike Delivery </p>
                    <img src={bikeImage} alt="img" className='w-16 h-16 p-1 shadow-md rounded-full ' />
                    
                </div>
                <div className='mx-8 lg:ml-16'>
                    <h1 className=' text-7xl md:text-6xl lg:text-7xl font-bold capitalize'>The fastest <span className='text-orange-500'>Delivery</span> in your City</h1>
                    <p className='mt-5 lg:mr-28'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestias nesciunt similique voluptates mollitia earum nihil animi suscipit adipisci ducimus?</p>
                    <button className='bg-orange-500 px-12 py-4 mt-6 text-center text-gray-200 w-[100%] lg:w-80 text-lg rounded-md'>Order Now</button>
                </div>
            </div>
            <div className=' flex justify-center mt-20'>
                <div className='p-2 mx-3 w-[80vw] md:w-[450px] lg:w-[45vw] max-w-[480px]
                relative h-[1100px] sm:h-auto'>
                    <img src={herobg} alt="" className='w-[100%] h-[100%] md:h-[600px]' />
                    <div className='absolute w-[105%] h-[100%] top-0 -right-3 flex flex-wrap justify-center  pt-8 px-20 sm:px-1'>
                        {HeroCart.map((item , ind) => {
                            return (
                                <div key={ind} className='w-40 h-[200px] cart-item flex flex-col items-center justify-between  rounded-md m-1 mb-16 mr-5  '>
                                        <img src={item.img}  alt="img" className=' w-auto h-[120px] relative -top-10 ' />
                                    <div className='  w-full h-[80px]   flex flex-col items-center relative -top-8'>
                                        <h1 className=' text-center text-xl font-bold'>{item.name}</h1>
                                        <p className='cart-'>{item.category}</p>
                                        <h4 className='text-xl'>${item.price}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero