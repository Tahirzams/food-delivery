import React, { useState } from 'react';
import avatar from '../assets/img/avatar.png';
import logo from '../assets/img/logo.png';
import 'animate.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from '../firebaseConfig/Config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { FcMenu } from 'react-icons/fc';
import { GrFormAdd } from 'react-icons/gr';
import { FiLogOut } from 'react-icons/fi';
import { BsBasket3Fill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const Header = () => {
  let [toggle, settoggle] = useState(false);
  let [islog, setislog] = useState(false);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [{ user, cartitems }, dispatch] = useStateValue()
  let signin = async () => {
    let { user: { refreshToken, providerData } } = await signInWithPopup(auth, provider)
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0]
    })
    localStorage.setItem("user", JSON.stringify(providerData[0]))
  }
  let logout = () => {
    localStorage.clear()
    setislog(false)
  }

  let openCart = () => {
    dispatch({
      type: 'SET_CART',
      cart: true
    })
  }

  return (
    <div className='flex w-full bg-blue-200 px-6 relative'>
      <Link to='/' className=' flex items-center'>
        <img className='w-10' src={logo} alt="logo img" />
       <span className='font-semibold text-lg text-gray-500 ml-2'>JErKy</span>
      </Link>
      <div className="lgscreen   w-screen mx-16 md:flex justify-end hidden mr-16">
        <ul className='flex w-[50vw] justify-between items-center text-xl capitalize  '>
          <li className='cursor-pointer'>home</li>
          <li className='cursor-pointer'>category</li>
          <li className='cursor-pointer'>about us</li>
          <li className='cursor-pointer'>contact us</li>
        </ul>
      </div>
      <div className="mdscreen   w-screen flex md:hidden justify-end mx-10 relative  ">
        <button className=' z-10' onClick={() => settoggle(!toggle)}><FcMenu size={'35px'} /></button>
        {
          <ul className={toggle ? "flex flex-col absolute w-[100%] bg-blue-300 top-[100%] text-xl text-white  capitalize animate__animated animate__fadeInDown" : " flex-col absolute w-[100%] bg-blue-300 top-[100%] text-xl text-white  capitalize animate__animated animate__fadeOutUp -z-10 opacity-0 "}>
            <li className='my-3 hover:bg-gray-500 py-3 text-center'>home</li>
            <li className='my-3 hover:bg-gray-500 py-3 text-center'>category</li>
            <li className='my-3 hover:bg-gray-500 py-3 text-center'>about us</li>
            <li className='my-3 hover:bg-gray-500 py-3 text-center'>contact us</li>
          </ul>
        }
      </div>
      <div onClick={openCart} className=' text-center flex items-center mr-10  relative cursor-pointer '><BsBasket3Fill size={30} color='gray' />
        <span className='w-6 h-6 bg-red-500 rounded-full absolute top-0 -right-2'>{cartitems.length}</span>
      </div>
      <img className='w-12 h-12 rounded-full ' src={user ? user.photoURL : avatar} alt="" onClick={() => {
        if (user) {
          setislog(!islog)
        } else {
          signin()
        }
      }} />
      {islog &&
        <div className='absolute animate__animated animate__fadeInDown right-2 top-[100%] rounded-md bg-red-300'>
          <Link to='/addItems' className='p-1 rounded-md  hover:bg-red-400 flex items-center'>Add Items <GrFormAdd size={'20px'} /></Link>
          <button className='text-lg flex items-center bg-red-400 hover:bg-red-500 rounded-md py-1 mt-7 px-3 text-center w-[100%]' onClick={logout}>Log Out <span className='mx-2'><FiLogOut /> </span>
          </button>
        </div>
      }
    </div>
  )
}

export default Header