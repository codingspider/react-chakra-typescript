import { Box, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import SearchForm from "./SearchForm";

const BasicInfo = () => {
  return (
    <>
      <Box flex={{ base: "1", md: "4" }}>
        {/* Input fields box */}
        <Box
          display={{ base: "block", md: "flex" }}
          border="1px solid teal"
          padding={4}
          mb={{ base: 4, md: 6 }} // Add margin-bottom to separate inputs from the Grid section below
        >
          {/* Invoice Number input */}
          <InputGroup mb={{ base: 4, md: 0 }} mr={{ md: 4 }} flex="1">
            <InputLeftAddon>Invoice Number: </InputLeftAddon>
            <Input type="number" bg="white" placeholder="26-09-001" />
          </InputGroup>

          {/* User input */}
          <InputGroup mb={{ base: 4, md: 0 }} mr={{ md: 4 }} flex="1">
            <InputLeftAddon>User: </InputLeftAddon>
            <Input type="text" bg="white" placeholder="admin" />
          </InputGroup>

          {/* Sale Date input */}
          <InputGroup flex="1">
            <InputLeftAddon>Sale Date: </InputLeftAddon>
            <Input type="date" bg="white" />
          </InputGroup>
        </Box>

        {/* Grid Section below input fields */}
        <SearchForm></SearchForm>
      </Box>
    </>
  );
}

export default BasicInfo