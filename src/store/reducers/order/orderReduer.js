import * as orderActions from "../../actions/actionsTypes"
const initialState={
    orders:[],
    loading:false
}
const orderReducer=(state=initialState,action)=>{
    switch(action.type){
        case orderActions.PURCHASE_BURGER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case orderActions.PURCHASE_BURGER_SUCCESS:
            const newObj = {
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                orders:state.orders.concat(newObj),
                loading:false

            }
        case orderActions.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:true

            }
            default:
                return state
    }
}
export default orderReducer