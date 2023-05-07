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
import { MdShoppingCart } from "react-icons/md";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const storename = localStorage.getItem("store_name");

  const cartLink = "/cart/" + username;

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
            <Text fontSize={36} fontWeight={600} color="blue.500">SHOPEDIA</Text>
          </Link>
        </Flex>
        <Flex justify="space-evenly" align="center" ml="auto">
          <Link to={cartLink}>
            <MdShoppingCart size="25"/>
          </Link>
        </Flex>
        <Flex justify="space-evenly" align="center" ml="10" mr="4">
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
                  <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                  <MenuItem onClick={() => navigate("/profile/" + username)}>My Profile</MenuItem>
                  <MenuItem onClick={() => navigate("/store/" + storename)}>My Store</MenuItem>
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
