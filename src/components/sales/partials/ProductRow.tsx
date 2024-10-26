import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Textarea,
  Text,
} from "@chakra-ui/react";

import { useShoppingCart } from "../../../contexts/ShoppingCartContext";
import CartItem from "../../products/CartItem";
import FormatCurrency from "../../../../src/utilities/FormatCurrency";
import { useEffect, useState } from "react";
import apiClient from "../../../services/axios";

interface StoreItemsProps {
  id: number;
  name: string;
  price: number;
}

function ProductRow() {
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
    <Box p={4}>
      {/* Table container */}
      <Box overflowX="auto">
        {cartItems.length > 1 ? (
          <Table variant="striped" colorScheme="teal" size="sm" id="productRow">
            <Thead>
              <Tr>
                <Th>Product Information</Th>
                <Th>Quantity</Th>
                <Th>Unit</Th>
                <Th>Rate</Th>
                <Th>Total</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
            </Tbody>
          </Table>
        ) : (
          <div>One or no items in the cart</div>
        )}
      </Box>

      {/* Notes and Total Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        mt={4}
        alignItems={{ base: "stretch", md: "center" }}
      >
        {/* Notes Section */}
        <Box flex={{ base: "1", md: "1" }} mb={{ base: 4, md: 0 }}>
          <Text fontWeight="bold" mb={2}>
            Notes
          </Text>
          <Textarea placeholder="Add notes here..." resize="vertical" />
        </Box>

        {/* Total Section */}
        <Box
          flex={{ base: "1", md: "1" }}
          textAlign={{ base: "left", md: "right" }}
          ml={{ base: 0, md: 4 }}
        >
          <Text fontWeight="bold" fontSize="lg">
            Total
          </Text>
          <Text fontSize="4xl" color="red.500" fontWeight="bold">
            {storeItems &&
              FormatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}

            <Text as="span" fontSize="lg">
              BDT
            </Text>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductRow;
