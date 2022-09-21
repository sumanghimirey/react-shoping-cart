import React from 'react'
import {Card, Button} from "react-bootstrap"
import { useShopingCart } from '../context/ShopingCartContext'
import { formatCurrency } from '../utelities/formatCurrency'

type StoreItemProps = {
    id: number,
    name: string, 
    price:number,
    imgUrl: string
}

export default function StoreItem({id, name, price, imgUrl}:StoreItemProps) {

    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}  = useShopingCart()
  return (
    <Card className = "h-100">
   <Card.Img variant="top" 
   src={imgUrl} height="200px"
    style={{objectFit:"cover"}} 
   /> 
   <Card.Body className="d-flex flex-column">
    <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
        <span className ="fs-2"> {name}</span>
        <span className ="ms-2 text-muted"> {formatCurrency(price)}</span>
    </Card.Title>
    <div className="mt-auto">
        {getItemQuantity(id) === 0 ? (
            <Button className = "w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
        ) : <div className="d-flex aligns-items-center flex-column" style={{gap:".5rem"}}>
            <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
               <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
               <div>
               <span className="fs-3"> {getItemQuantity(id)} in cart</span>
               </div>
               <Button  onClick={() => increaseCartQuantity(id)}>+</Button>
                 </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)} > Remove</Button>
             </div>}

    </div>
   </Card.Body>
   </Card>
  )
}
