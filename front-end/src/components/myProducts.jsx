import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  HStack,
  Select,
  Input,
} from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { MdOutlineStorefront, MdCircle } from "react-icons/md";
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useParams } from 'react-router-dom';

export function MyProducts() {
  const params = useParams();

  //states for fetching products & categories data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [apiUrl, setApiUrl] = useState('http://localhost:2000/product');

  //states for query string
  const [activePage, setActivePage] = useState(1);
  const [sortType, setSortType] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  // const [store, setStore] = useState('');

  useEffect(() => {
    async function getProducts() {
      const storeData = await axios.get("http://localhost:2000/store/" + params.storename);
      console.log(storeData);

      setApiUrl(
        'http://localhost:2000/product?' + 
        'p=' + activePage +
        '&s=' + sortType +
        '&c=' + category +
        '&q=' + query +
        '&store=' + storeData.data.data.id
      );
      // console.log(apiUrl);

      const categoryData = await axios.get("http://localhost:2000/category");
      setCategories(categoryData.data.categories);

      const productData = await axios.get(apiUrl);
      setProducts(productData.data.products);
      setTotalPage(Math.ceil(productData.data.count / 9));
    }
    getProducts();
  }, [apiUrl, activePage, sortType, category, query, params])
  
  function rupiah(price) {
    const priceString = price.toString();
    const len = priceString.length;
    let str = "";
    for (let i = 0; i < len; i++) {
      str += priceString[i];
      if ((len - i - 1) % 3 === 0 && i !== len - 1) {
        str += ".";
      }
    }
    return `Rp${str}`;
  }

  return (
    <>
      <Center>
        <Stack spacing={5} mt="10">
          <HStack>
            <Stack w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Sort:
              </Text>
            </Stack>
            <Select placeholder='Select option' value={sortType} onChange={e => setSortType(e.target.value)} >
              <option value='lh'>Lowest Price</option>
              <option value='hl'>Highest Price</option>
              <option value='az'>Name (A to Z)</option>
              <option value='za'>Name (Z to A)</option>
            </Select>
          </HStack>
          <HStack>
            <Stack w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Category:
              </Text>
            </Stack>
            <Select placeholder='Select option' value={category} onChange={e => setCategory(e.target.value)} >
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
          </HStack>
          <HStack>
            <Stack  w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Filter by name:
              </Text>
            </Stack>
            <Input placeholder='Ex: Adidas' value={query} onChange={e => setQuery(e.target.value)}/>
          </HStack>
        </Stack>
      </Center>

      <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
        <Center py={12}>
          <SimpleGrid columns={[1, null, 2, null, 3]} spacing={5}>
            {products.map((product) => {
              return (
                <Box
                  key={product.id}
                  role={'group'}
                  p={6}
                  maxW={'330px'}
                  w={'full'}
                  bg={'white'}
                  boxShadow={'2xl'}
                  rounded={'lg'}
                  pos={'relative'}
                  zIndex={1}
                  mb={10}>
                  <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                      transition: 'all .3s ease',
                      content: '""',
                      w: 'full',
                      h: 'full',
                      pos: 'absolute',
                      top: 5,
                      left: 0,
                      backgroundImage: `url(${product.image_url})`,
                      filter: 'blur(15px)',
                      zIndex: -1,
                    }}
                    _groupHover={{
                      _after: {
                        filter: 'blur(20px)',
                      },
                    }}>
                    <Image
                      rounded={'lg'}
                      height={230}
                      width={282}
                      objectFit={'cover'}
                      src={product.image_url}
                    />
                  </Box>
                  <Stack pt={10} align={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} textTransform={'uppercase'}>
                      {product.name}
                    </Heading>
                    <Text color={'gray.500'} fontSize={'sm'} noOfLines={1}>
                      {product.description}
                    </Text>
                    <Stack direction={'row'} align={'center'}>
                      <Text fontWeight={800} fontSize={'xl'}>
                        {rupiah(product.price)}
                      </Text>
                    </Stack>
                    <HStack>
                      <MdOutlineStorefront/>
                      <Text color={'gray.600'} noOfLines={1}>
                          {product.User_store.store_name} | {product.User_store.store_address}
                      </Text>
                    </HStack>
                    {
                      product.is_active?
                      <HStack>
                        <MdCircle color="green"/>
                        <Text color={'gray.600'}>Active</Text>
                      </HStack>:
                      <HStack>
                        <MdCircle color="red"/>
                        <Text color={'gray.600'}>Not Active</Text>
                      </HStack>
                    }
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
        </Center>
        <Center>
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, pageInfo) => setActivePage(pageInfo.activePage)}
          />
        </Center>
      </Stack>
    </>
  );
}
