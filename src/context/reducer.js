export const actionType = {
    SET_USER: 'SET_USER',
    SET_ITEMS: 'SET_ITEMS',
    SET_CART: 'SET_CART',
    SET_CARTITEMS: 'SET_CARTITEMS'
}
const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state, user: action.user,
            }
        case actionType.SET_ITEMS:
            return {
                ...state, items: action.items,
            }
        case actionType.SET_CART:
            return {
                ...state, cart: action.cart,
            }
        case actionType.SET_CARTITEMS:
            return {
                ...state, cartitems: action.cartitems,
            }
        default:
            return state;
    }
}

export default reducer