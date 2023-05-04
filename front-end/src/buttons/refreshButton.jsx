import {Button} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";

export function RefreshButton() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Button leftIcon={<MdRefresh/>} colorScheme="teal" width="100px" onClick={handleRefresh}>Refresh</Button>
  );
}
