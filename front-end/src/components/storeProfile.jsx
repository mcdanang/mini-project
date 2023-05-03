import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function StoreProfile() {
  const [store, setStore] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getUser() {
      const storeData = await axios.get("http://localhost:2000/store/" + params.storename);
      setStore(storeData.data.data);
    }
    getUser();
  }, [params])

  return (
    <>
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '50%', md: '740px' }}
          height={{ sm: '100%', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}>
          <Flex bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={"https://picsum.photos/600"}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {store.store_name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              {store.store_address}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              The best fashion store in town
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                phone: 08123456789
              </Badge>
            </Stack>

            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                Message
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
