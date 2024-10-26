import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ProductRow from "../components/sales/partials/ProductRow";
import apiClient from "../services/axios";

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number, quantity:number) => void;
  addToCart: (id: number, quantity: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const checkProductStock = async ({ id }: { id: number }) => {
    try {
      const response = await apiClient.get(`https://dummyjson.com/products/${id}`);
      return response.data.stock;
    } catch (error) {
      console.error("Error fetching product stock:", error);
      throw error;
    }
  };


  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function addToCart(id: number, quantity: number) {
    
      checkProductStock({ id })
      .then(stock => {
        if (stock < quantity) {
          alert("Sorry, we don't have enough stock for this product.");
        }
      })
      .catch(error => {
        console.error("Error checking stock:", error);
      });

    setCartItems((currItems) => {
      const itemExists = currItems.find((item) => item.id === id);

      if (!itemExists) {
        return [...currItems, { id, quantity }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity };
          } else {
            return item;
          }
        });
      }
    });
  }

  const increaseQuantity = (id: number, quantity: number) => {
  if (quantity == null) {
    console.error("Quantity is required");
    return;
  }

  checkProductStock({ id })
    .then(stock => {
      if (stock < quantity + 1) {
        alert("Sorry, we don't have enough stock for this product.");
        return;
      }

      setCartItems(currItems => {
        if (currItems.find(item => item.id === id) == null) {
          return [...currItems, { id, quantity: 1 }];
        } else {
          return currItems.map(item => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
        }
      });
    })
    .catch(error => {
      console.error("Error checking stock:", error);
    });
};


  function decreaseQuantity(id: number) {
    setCartItems((currItems) => {
      const foundItem = currItems.find((item) => item.id === id);

      if (foundItem && foundItem.quantity === 1) {
        // If the item quantity is 1, remove the item from the cart
        return currItems.filter((item) => item.id !== id);
      } else {
        // Otherwise, reduce the quantity by 1
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return [...currItems.filter((item) => item.id !== id)];
    });
  }
  
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ProductRow></ProductRow>
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
