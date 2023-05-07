import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Heading,
  VStack,
  Center,
  Stack,
  HStack,
  Text,
  Select,
} from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { StoreProfile } from "../components/storeProfile";
import { ProductDrawer } from "../components/productDrawer";
import { MyProducts } from "../components/myProducts";
import { ProductForm } from "../components/forms/productForm";
import { Categories } from "../components/categories";
import { CategoryForm } from "../components/forms/categoryForm";
import { GrossIncome } from "../components/reportings/grossIncome";
import { useState } from "react";
import { TotalTransaction } from "../components/reportings/totalTransaction";
import { TopSelling } from "../components/reportings/topSelling";

export function Store() {
  const [report, setReport] = useState("option1");

  return (
    <>
      <Navbar />
      <StoreProfile />
      <Tabs size="lg" isFitted variant="unstyled">
        <TabList>
          <Tab>Manage Product</Tab>
          <Tab>Manage Category</Tab>
          <Tab>Reporting</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <VStack pt="10">
              <Heading>My Products</Heading>
              <ProductDrawer
                product={{}}
                title="Create New Product"
                component={ProductForm}
                buttonName="Create new product"
              />
              <MyProducts />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack pt="10">
              <Heading>Category List</Heading>
              <ProductDrawer
                product={{}}
                title="Create New Category"
                component={CategoryForm}
                buttonName="Create new category"
              />
              <Categories />
            </VStack>
          </TabPanel>

          <TabPanel>
            <Stack align={"center"} my={10}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Reporting
              </Heading>
            </Stack>

            <Center mb="2rem">
              <HStack>
                <Stack mr="6rem">
                  <Text fontWeight={600} fontSize={"lg"}>
                    Report：
                  </Text>
                </Stack>
                <Stack>
                  <Select
                    defaultValue="option1"
                    onChange={(e) => setReport(e.target.value)}
                  >
                    <option value="option1">Gross Income</option>
                    <option value="option2">Total Transaction</option>
                    <option value="option3">Top Selling</option>
                  </Select>
                </Stack>
              </HStack>
            </Center>

            {report === "option1" ? (
              <GrossIncome />
            ) : report === "option2" ? (
              <TotalTransaction />
            ) : (
              <TopSelling />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
