import React, { useEffect } from 'react'
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import AddItems from './components/AddItems';
import Header from './components/Header';
import { getDataFromFirebase } from './utils/FirebaseFuctions';
import { useStateValue } from './context/StateProvider';
import Cart from './components/Cart';
const App = () => {
  const [{ cartitems, cart }, dispatch] = useStateValue();

  let fetchdata = async () => {
    await getDataFromFirebase().then((data) => {
      dispatch({
        type: "SET_ITEMS",
        items: data,
      })
    })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  useEffect(() => {
  }, [cartitems])

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addItems' element={<AddItems fetchdata={fetchdata} />} />
      </Routes>
      {cart && <Cart caritem={cartitems} />}
    </div>
  )
}

export default App