import { useState, useEffect } from 'react'
import axios from 'axios'

export default function OrderAPI() {
    const [allOrders, setAllOrders] = useState([])
    const [callback, setCallback] = useState(false)



    return {
        allOrders: [allOrders, setAllOrders]
    }
}
    
export const getAllOrdersAPI = async (user,token) => {
    return await axios.get(`/order/all_orders`, user, {
    headers: {Authorization: token}
})
}

export const placeOrderAPI = async (user,token) => {
    return await axios.post(`/order/place_order`, user, {
    headers: {Authorization: token}
})
}