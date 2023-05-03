import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useRef } from "react";
import { ProductForm } from "./productForm";

export function ProductDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
        Create New Product
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent minW="sm">
          <DrawerCloseButton />
          <DrawerHeader>Create New Product</DrawerHeader>

          <DrawerBody>
            <ProductForm/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}