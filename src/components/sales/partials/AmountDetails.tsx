import {
  Box,
  VStack,
  Input,
  HStack,
  InputGroup,
  Button,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import apiClient from "../../../services/axios";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";

interface StoreItemsProps {
  id: number;
  name: string;
  price: number;
}

const AmountDetails = () => {
  const { cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<StoreItemsProps[] | undefined>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("https://dummyjson.com/products");
        setStoreItems(response.data.products);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [setStoreItems]);
  return (
    <>
      <Box
        border="1px solid teal"
        padding={3}
        flex={{ base: "1", md: "1" }}
        width={{ base: "100%", md: "100%", lg: "30%" }}
        ml={{ base: 0, md: 4 }}
        mt={{ base: 4, md: 0 }}
      >
        <VStack align="stretch">
          <Text>Sub Total:</Text>
          <Input
            placeholder="Sub Total"
            size="sm"
            bg="white"
            value={cartItems.reduce((total, cartItem) => {
              const item = storeItems?.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)}
            isReadOnly
          />

          <Text>VAT:</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Select placeholder="Select option">
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Input placeholder="0.00" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Text>Discount:</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Select placeholder="Select option">
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Input placeholder="0.00" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Text>Total :</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Input placeholder="total" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Text>Paid :</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Input placeholder="0" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Text>Due :</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Input placeholder="0" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Button colorScheme="teal" size="sm">
            Sell
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default AmountDetails;
