import {
  Box,
  VStack,
  Input,
  HStack,
  InputGroup,
  Button,
  Text,
} from "@chakra-ui/react";

const AmountDetails = () => {
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
          <Input placeholder="Sub Total" size="sm" bg="white" />

          <Text>VAT:</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Input placeholder="0" size="sm" bg="white" />
            </InputGroup>
            <InputGroup>
              <Input placeholder="0.00" size="sm" bg="white" />
            </InputGroup>
          </HStack>

          <Text>Discount:</Text>
          <HStack spacing={4}>
            <InputGroup>
              <Input placeholder="0" size="sm" bg="white" />
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
