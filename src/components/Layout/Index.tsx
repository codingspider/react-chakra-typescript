"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import {
  ArrowForwardIcon,
  DragHandleIcon,
  Search2Icon,
} from "@chakra-ui/icons";

import { Outlet } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const location = useLocation();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <ChakraLink
        as={ReactRouterLink}
        to="/admin/dashboard"
        display="flex"
        alignItems="center"
        px={2}
        py={1}
        p={2}
        ml={2}
        _hover={{
          bg: "teal.400",
          color: "white",
        }}
        bg={location.pathname.includes("/admin/dashboard") ? "teal.400" : ""}
        color={location.pathname.includes("/admin/dashboard") ? "white" : ""}
      >
        <Icon as={FiHome} mr={2} />
        <span>Dashboard</span>
      </ChakraLink>

      <Accordion
        allowToggle
        defaultIndex={location.pathname.includes("/admin/products") ? 0 : -1}
      >
        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Icon as={DragHandleIcon} mr={2} />
                Product Management
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChakraLink
              bg={
                location.pathname.includes("/admin/products") ? "teal.400" : ""
              }
              color={
                location.pathname.includes("/admin/products") ? "white" : ""
              }
              p={2}
              as={ReactRouterLink}
              to="/admin/products"
              display="flex"
              alignItems="center"
              _hover={{
                bg: "teal.400",
                color: "white",
              }}
            >
              <Icon as={ArrowForwardIcon} mr={2} />
              <span>Products</span>
            </ChakraLink>
            <ChakraLink
              p={2}
              as={ReactRouterLink}
              to="/home"
              display="flex"
              alignItems="center"
              _hover={{
                bg: "teal.400",
                color: "white",
              }}
            >
              <Icon as={ArrowForwardIcon} mr={2} />
              <span>Brand</span>
            </ChakraLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Icon as={Search2Icon} mr={2} />
                Report
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChakraLink
              as={ReactRouterLink}
              to="/home"
              display="flex"
              alignItems="center"
              _hover={{
                bg: "teal.400",
                color: "white",
              }}
            >
              <Icon as={ArrowForwardIcon} mr={2} />
              <span>Category</span>
            </ChakraLink>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
          <Button onClick={toggleColorMode} ml="10px">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
