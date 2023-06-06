import fetchdatalocaly from "../utils/fetchdatalocaly"
import {fetchcartdatalocaly} from "../utils/fetchdatalocaly"

let userinfo = fetchdatalocaly();
let cartdata = fetchcartdatalocaly();
export const initialState = {
    user: userinfo,
    items: null,
    cart: false,
    cartitems : cartdata || [],
}