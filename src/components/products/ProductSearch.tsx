import {
  GridItem,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import apiClient from "../../services/axios";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";

const ProductSearch = () => {
  const [productName, setproductName] = useState("");
  const [productRate, setProductRate] = useState("");
  const [productStock, setproductStock] = useState("");
  const [productCat, setproductCat] = useState("");
  const { increaseQuantity } = useShoppingCart();

  const getProduct = async (query: string) => {
    try {
      const response = await apiClient.post("/get/product", {
        product_sku: query,
      });

      const productResponse = response.data.data;
      setproductName(productResponse.title);
      setProductRate(productResponse.price);
      setproductStock(productResponse.stock);
      setproductCat(productResponse.category);
      increaseQuantity(productResponse.id);

    } catch (error) {
      console.error("Error fetching product:", error);
      setproductName("");
      setProductRate("");
      setproductStock("");
    } finally {
      // Stop loading after fetching data
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    if (query.length > 2) {
      getProduct(query);
    }
  };

  return (
    <>
      <GridItem>
        <Box
          w="100%"
          p={4}
          borderRadius="md"
          border="1px solid teal"
          padding={4}
        >
          {/* Flex container for the product form */}
          <Flex
            direction={{ base: "column", md: "row" }} // Stack on small screens, side by side on larger
            justify="space-between"
            align="flex-start"
          >
            {/* Left side: Product Form Fields */}
            <Box flex="1">
              {/* Product ID */}
              <FormControl mb={4}>
                <FormLabel>Product SKU </FormLabel>
                <Input
                  bg="white"
                  name="product_sku"
                  onInput={handleInput}
                  placeholder="P0003"
                  id="productIdRef"
                />
              </FormControl>

              {/* Product Name */}
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  bg="white"
                  placeholder="Jens Pant"
                  value={productName ?? ""}
                  readOnly
                />
              </FormControl>

              {/* Quantity */}
              <FormControl mb={4}>
                <FormLabel>Quantity</FormLabel>
                <InputGroup>
                  <Input type="number" bg="white" placeholder="1" />
                  <InputRightAddon>Pcs</InputRightAddon>
                </InputGroup>
              </FormControl>

              {/* Rate */}
              <FormControl mb={4}>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <Input
                    bg="white"
                    placeholder="00.00"
                    readOnly
                    value={productRate}
                  />
                </InputGroup>
              </FormControl>

              {/* Category */}
              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  bg="white"
                  placeholder="Category Name"
                  value={productCat}
                  readOnly
                />
              </FormControl>
            </Box>

            {/* Right side: Stock and Add to Cart button */}
            <Box
              ml={{ base: 0, md: 4 }}
              mt={{ base: 4, md: 0 }}
              textAlign={{ base: "left", md: "right" }}
            >
              <Text color="red" fontSize="md" mb={2}>
                Stock
              </Text>
              <Text fontSize="4xl" color="teal.500" mb={4}>
                {productStock ?? "0"}
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
    </>
  );
};

export default ProductSearch;
