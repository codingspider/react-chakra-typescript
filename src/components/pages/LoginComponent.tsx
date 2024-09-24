"use client";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import apiClient from "../../services/axios";
import { useEffect, useState } from "react";
import { DASHBOARD } from "../../router";
import { useNavigate } from "react-router-dom";

interface FormInput {
  email: string;
  password: string;
  remember_me: boolean;
}
export default function SimpleCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/login", data);
      const token = response.data.success.token;
      localStorage.setItem("authToken", token);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(DASHBOARD);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Logging in failed",
        description: "Some fields are missing or invalid",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate(DASHBOARD);
    }
  }, [navigate]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" mt={1}>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email", { required: true })} />
                {errors.email && (
                  <Text color="red" fontSize="xs">
                    Email field is required
                  </Text>
                )}
              </FormControl>
              <FormControl id="password" mt={1}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <Text color="red" fontSize="xs">
                    Password field is required
                  </Text>
                )}
              </FormControl>
              <Stack spacing={10} mt={2}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox {...register("remember_me")}>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
