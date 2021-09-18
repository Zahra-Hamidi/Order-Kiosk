import axios from "axios";
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, ORDER_ADD_ITEM, ORDER_CLEAR, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_SET_PAYMENT_TYPE, ORDER_SET_TYPE, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, REMOVE_ORDER_ITEM } from "./constant"

export const setOrderType = (dispatch,orderType)=>{
    return dispatch({
        type:ORDER_SET_TYPE,
        payload:orderType
    })
}

export const listCategories = async(dispatch)=>{
    dispatch({type:CATEGORY_LIST_REQUEST});
    try {
        const {data} = await axios.get('/api/categories');
        return dispatch({
            type:CATEGORY_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
      return  dispatch({
            type:CATEGORY_LIST_FAIL,
            payload:error.message
        })
    }
};

export const listProducts = async (dispatch,categoryName = '') =>{
    dispatch({type:PRODUCT_LIST_REQUEST});
    try {
        const {data} = await axios.get(`/api/products?category=${categoryName}`);
       return dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        return  dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.message
        })   
    }
}

export const addToOrder = async(dispatch,item)=>{
    return dispatch({
        type:ORDER_ADD_ITEM,
        payload:item
    })
}


export const removeFromOrder = async(dispatch,item)=>{
    return dispatch({
        type:REMOVE_ORDER_ITEM,
        payload:item
    })
}

export const clearOrder= async(dispatch)=>{
    return dispatch({
        type:ORDER_CLEAR
    })
}

export const setPaymentType = async(dispatch,paymentType)=>{
    return dispatch({
        type:ORDER_SET_PAYMENT_TYPE,
        payload:paymentType
    })
}

export const createOrder = async (dispatch , order) =>{
    dispatch({type:ORDER_CREATE_REQUEST});
    try {
        
        const {data} = await axios.post('/api/orders',order);
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
        dispatch({
            type:ORDER_CLEAR
        })
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.message
        })
    }
}