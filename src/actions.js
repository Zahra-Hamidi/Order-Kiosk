import { ORDER_SET_TYPE } from "./constant"

export const setOrderType = (dispatch,orderType)=>{
    return dispatch({
        type:ORDER_SET_TYPE,
        payload:orderType
    })
}