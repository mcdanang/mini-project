import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onRegister = async () => {
    try {
      const data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        store_name: document.getElementById("store_name").value,
        store_address: document.getElementById("store_address").value,
      };

      const result = await axios.post(
        "http://localhost:2000/user/register",
        data
      );

      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("address").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("store_name").value = "";
      document.getElementById("store_address").value = "";

      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        Swal.fire({
          icon: "error",
          title: err.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: err.response.data.errors[0].message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w="100%"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w="100%">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          maxW="300%"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <Stack spacing={4}>
            {/* <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack> */}
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" width="100%" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl id="store_name" isRequired>
              <FormLabel>Store Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl id="store_address" isRequired>
              <FormLabel>Store Address</FormLabel>
              <Input type="text" />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onRegister}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                <Link color={"blue.400"} onClick={() => navigate("/")}>
                  Back to home
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
