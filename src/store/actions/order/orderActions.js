import * as orderActionsTypes from "../actionsTypes"
import axios from "../../../axios-orders"
export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:orderActionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData,
    }
}
export const purchaseBurgerFail=(error)=>{
    return{
        type:orderActionsTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerRequest=()=>{
    return{
        type:orderActionsTypes.PURCHASE_BURGER_REQUEST
    }
}
export const purchaseStart=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerRequest())
        axios.post('/orders.json',orderData)
        .then(res=>{
            dispatch(purchaseBurgerSuccess(res.data.name,orderData))
        })
        .catch(err=>{
            dispatch(purchaseBurgerFail(err))
        })

    }
}