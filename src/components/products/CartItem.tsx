import { Tr, Td, Button } from "@chakra-ui/react";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";
import { useEffect, useState } from "react";
import apiClient from "../../services/axios";

type CartItemProps = {
  id: number;
  quantity: number;
  item?: {
    id: number;
    name: string;
    price: number;
  };
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const [item, setItem] = useState<{
    id: number;
    title: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const response = await apiClient.get(
            `https://dummyjson.com/products/${id}`
          );
          setItem(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!item) return null;

  return (
    <Tr>
      <Td>{item.title}</Td>
      <Td>{quantity}</Td>
      <Td>pcs</Td>
      <Td>{item.price}</Td>
      <Td>{item.price * quantity}</Td>
      <Td>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          x
        </Button>
      </Td>
    </Tr>
  );
};

export default CartItem;
