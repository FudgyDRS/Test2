import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

type Props = {
  handleReloadModal: any;
};

export default function ReloadButton({ handleReloadModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function mintNFT() {
    // some function to mint NFTs
  }

  function testClick() {
    console.log(activateBrowserWallet);
    console.log(account);
  }

  return (
    <>
      <Box width="142px" background="gray.700" borderRadius="xl" py="0">
        <Button
          onClick={handleReloadModal}
          bg="gray.800"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            backgroundColor: "gray.700"
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3">
            <Text color="white" fontSize="md">
              Reload Data
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
}
