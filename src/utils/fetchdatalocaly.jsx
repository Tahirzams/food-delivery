import React from 'react'

const fetchdatalocaly = () => {
  const userinfo = localStorage.getItem('user') !== undefined ?
    JSON.parse(localStorage.getItem('user')) :
    localStorage.clear();
  return userinfo
}

const fetchcartdatalocaly = () => {
  const cartdata = localStorage.getItem('addcartdata') !== undefined ?
    JSON.parse(localStorage.getItem('addcartdata')) :
    localStorage.clear();
  return cartdata
}

export default fetchdatalocaly
export { fetchcartdatalocaly }