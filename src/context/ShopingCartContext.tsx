import { createContext, useContext, ReactNode, useState } from "react";
import StoreItem from "../components/StoreItem";

type ShopingCartProviderProps = {
    children:ReactNode
}

type ShopingCartContext = {
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    openCart:() => void
    colseCart:()=>void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity:number
}

const ShopingCartContext = createContext({} as ShopingCartContext)

export const useShopingCart = () => {
    return useContext (ShopingCartContext)
}

export const ShopingCartProvider = ({children}: ShopingCartProviderProps) => {
    const  [cartItems, SetCartItems] = useState<CartItem[]>([]) 
    const getItemQuantity = (id:number) => {
        return cartItems.find(item => item.id === id) ?.quantity || 0
    }

    const increaseCartQuantity = (id:number) => {
        SetCartItems ( currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            }
            else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity +1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        })
        
    }

    
    function decreaseCartQuantity(id: number) {
        SetCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    else {
                        return item;
                    }
                });
            }
        });

    }

    const removeFromCart = (id:number) => {
        SetCartItems ( currItems => {
                return currItems.filter(item=>item.id !== id)
           })}

    return (
        <ShopingCartContext.Provider 
        value={{
            getItemQuantity,
             increaseCartQuantity,
              decreaseCartQuantity,
               removeFromCart 
               }}>
            {children}
        </ShopingCartContext.Provider>
    )
}