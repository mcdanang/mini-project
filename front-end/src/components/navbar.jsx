import {
  Avatar,
  Button,
  Flex,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const storename = localStorage.getItem("store_name");

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("store_name");
    navigate("/login");
  };

  return (
    <VStack
      justify="space-evenly"
      align="center"
      shadow="base"
      bgColor="gray.50"
      w="100vw"
      h="16"
    >
      <Flex w="100%">
        <Flex justify="space-evenly" align="center" ml="10">
          <Link to="/">
<<<<<<< HEAD
            <Text fontSize={36} color="skyblue">SHOPEDIA</Text>
=======
            <Text fontSize={36} fontWeight={600} color="blue.500">SHOPEDIA</Text>
>>>>>>> 4e2b3bb313f975c952a477c8d0b52099f4ac9c43
          </Link>
        </Flex>
        <Flex justify="space-evenly" align="center" ml="auto" mr="4">
          {token ? (
            <>
              <Menu>
                <Avatar
                  as={MenuButton}
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  mr="2"
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/")}>Show Home Page</MenuItem>
                  <MenuItem onClick={() => navigate("/profile/" + username)}>Show Profile Page</MenuItem>
<<<<<<< HEAD
                  <MenuItem>Show Store Page</MenuItem>
=======
                  <MenuItem onClick={() => navigate("/store/" + storename)}>Show Store Page</MenuItem>
>>>>>>> 4e2b3bb313f975c952a477c8d0b52099f4ac9c43
                  <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
              <Text as="b">{username}</Text>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                mr="2"
              >
                Login
              </Button>
              <Button
                mr="2"
                rounded={"full"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </VStack>
  );
};
