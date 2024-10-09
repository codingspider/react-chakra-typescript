import { AddIcon } from "@chakra-ui/icons";
import {
  GridItem,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Textarea,
} from "@chakra-ui/react";

import { useState, useRef } from "react";
import apiClient from "../../services/axios";

const CustomerSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const customerIdRef = useRef(null);
  const [contactId, setContactId] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const getCustomer = async (query:string) => {
    const data = {
      customer_id: query,
    };
    const response = await apiClient.post("/get/contact", data);
    setName(response.data.data.name);
    setContactId(response.data.data.id);
    setPhoneNumber(response.data.data.phone_number);
    setCity(response.data.data.city);
    setAddress(response.data.data.address);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setInputValue(query);

    if (query.length > 2) {
      getCustomer(query);
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
          {/* Customer Type */}
          <FormControl mb={4}>
            <FormLabel>Customer Type</FormLabel>
            <RadioGroup defaultValue="Retail">
              <Stack direction="row" spacing={5}>
                <Radio value="Retail">Retail</Radio>
                <Radio value="Wholesale">Wholesale</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Customer ID */}
          <FormControl mb={4}>
            <FormLabel>Customer ID</FormLabel>
            <InputGroup bg="white">
              <Input
                name="customer_id"
                placeholder="C0001"
                onInput={handleInput}
                ref={customerIdRef}
                defaultValue={inputValue}
              />
              <Input type="hidden" value={contactId}></Input>
              <InputRightElement width="3rem">
                <Button h="1.75rem" size="sm">
                  <AddIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Name */}
          <FormControl mb={4}>
            <FormLabel>Customer Name</FormLabel>
            <Input bg="white" value={name} placeholder="City" readOnly />
          </FormControl>

          {/* Address */}
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Textarea
              bg="white"
              placeholder="Address"
              resize="vertical"
              value={`${address}, ${city}`}
              readOnly
            />
          </FormControl>

          {/* Contact No */}
          <FormControl>
            <FormLabel>Contact No.</FormLabel>
            <Input
              bg="white"
              value={phoneNumber}
              placeholder="Contact Number"
              readOnly
            />
          </FormControl>
        </Box>
      </GridItem>
    </>
  );
};

export default CustomerSearch;
