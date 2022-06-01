import React from 'react'
import { Link, useParams } from 'react-router-dom'


function OrderDetails() {

  const state = useContext(GlobalState)
    const [allOrders] = state.AdvertisementAPI.allOrders
    const [advertisements] = state.AdvertisementAPI.advertisements
    const [token] = state.UserAPI.token
    const { id } = useParams()
    const [orderDetails, setOrderDetails] = useState([])


    useEffect(() => {
      const setO = async () => {
          console.log(id)
          await allOrders.forEach(o => {

              //console.log(ad._id)
              if (o._id === id) {
                  setOrderDetails(o)
              }
          })

      }
      setO();

  }, [id, allOrders])

  console.log(allOrders)
  if (orderDetails.length ===0) return null
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails