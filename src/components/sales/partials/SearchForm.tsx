import { Flex, Box, Grid } from "@chakra-ui/react";
import CustomerSearch from "../../contact/CustomerSearch";
import ProductSearch from "../../products/ProductSearch";

const SearchForm = () => {
  return (
    <>
      <Flex direction="column">
        <Box flex={{ base: "1", md: "4" }}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <CustomerSearch></CustomerSearch>
            <ProductSearch></ProductSearch>
          </Grid>
        </Box>
      </Flex>
    </>
  );
};

export default SearchForm;
