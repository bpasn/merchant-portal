import { getOrders } from '@/lib/services/order.service'
import OrderModule from '@/modules/businesses/order'
import React from 'react'


const OrderPage = async () => {
    const orders = await getOrders();
  return (
    <OrderModule orders={orders}/>
  )
}

export default OrderPage