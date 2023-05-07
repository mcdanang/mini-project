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
import { MdEdit, MdAdd } from "react-icons/md";

export function FormDrawer(props) {
  const Component = props.component;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button leftIcon={props.editIcon?<MdEdit />:<MdAdd/>} ref={btnRef} colorScheme='blue' onClick={onOpen}>
        {props.buttonName}
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
          <DrawerHeader>{props.title}</DrawerHeader>

          <DrawerBody>
            <Component data={props.data}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}