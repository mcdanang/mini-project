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

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
            <Text fontSize={36} color="skyblue">SHOPEDIA</Text>
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
                  <MenuItem>Show Store Page</MenuItem>
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
