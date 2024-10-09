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

function ProductRow() {
  const { cartItems } = useShoppingCart();

  return (
    <Box p={4}>
      {/* Table container */}
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal" id="productRow">
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
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Tbody>
        </Table>
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
            6400.00{" "}
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
