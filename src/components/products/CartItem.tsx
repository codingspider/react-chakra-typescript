import { Tr, Td, Button, HStack } from "@chakra-ui/react";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";
import { useEffect, useState } from "react";
import apiClient from "../../services/axios";
import FormatCurrency from "../../../src/utilities/FormatCurrency";

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
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useShoppingCart();

  const [item, setItem] = useState<{
    id: number;
    title: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
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
      <Td>
        <HStack>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={() => decreaseQuantity(id)}
          >
            -
          </Button>
          <div>
            <span className="fs-3">{quantity}</span>
          </div>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={() => increaseQuantity(id, quantity)}
          >
            +
          </Button>
        </HStack>
      </Td>
      <Td>pcs</Td>
      <Td> {FormatCurrency(item.price)}</Td>
      <Td>{FormatCurrency(item.price * quantity)}</Td>
      <Td>
        <Button
          colorScheme="red"
          size="xs"
          onClick={() => removeFromCart(item.id)}
        >
          x
        </Button>
      </Td>
    </Tr>
  );
};

export default CartItem;
