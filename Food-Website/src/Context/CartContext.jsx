import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export const CartProvider = ({children}) =>{



  const [cartItems, setCartItems] = useState([]);
  

  const addToCart = (product) =>{
    const itemInCart = cartItems.find((item) => item.id === product.id);
    
    if(itemInCart){
      //  Increse Quantity already in cart
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? {...item,quantity: item.quantity + 1 }: item
      )
      setCartItems(updatedCart)
      toast.success("Product Quantity increased")
    } else{
      // Add new item with quantity 1
       setCartItems([...cartItems, {...product, quantity: 1}])
       toast.success("Product is Added to cart")

    }
    

  }

  const updateQuantity = (cartItem, productId, action) =>{
    setCartItems( cartItem.map(item =>{
      if(item.id === productId){
        let newUnit = item.quantity;
        if(action === "increase"){
          newUnit++;
          toast.success("Product quantity increased")
        } else if(action === "decrease" && newUnit > 1){
          newUnit --;
          toast.success("Product quantity decreased")
        }
        return newUnit > 0 ? {...item, quantity: newUnit} :null
      }
      return item;
    }).filter(item => item != null) // remove items with quantity 0)
  )
  }

  const deleteItem = (productId) =>{
    setCartItems(cartItems.filter(item =>item.id !== productId))
    toast.success("Product Delated")
  }



  return <CartContext.Provider value={{cartItems, setCartItems, addToCart, updateQuantity, deleteItem}}>
    {children}

    </CartContext.Provider>

}

export const useCart = () =>useContext(CartContext)