import { Button, Box, Text } from "@chakra-ui/react";
import {
  useEthers
  //useEtherBalance
} from "@usedapp/core";
//import { formatEther } from "@ethersproject/units";

type Props = {
  handleMintModal: any;
};

export default function MintButton({ handleMintModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  //const etherBalance = useEtherBalance(account);

  //function mintNFT() {
  // some function to mint NFTs
  //}

  function testClick() {
    console.log(activateBrowserWallet);
    console.log(account);
  }

  return account ? (
    <>
      <Box width="142px" background="gray.700" borderRadius="xl" py="0">
        <Button
          onClick={handleMintModal}
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
              Mint NFT(s)
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Box width="142px" background="red.200" borderRadius="xl" py="0">
        <Button
          onClick={testClick}
          bg="gray.1000"
          border="1px solid transparent"
          _hover={{
            borderStyle: "solid",
            backgroundColor: "red.200"
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3">
            <Text color="white" fontSize="md">
              Mint NFT(s)
            </Text>
          </Box>
        </Button>
      </Box>
      <br />
      <Text color="red" fontSize="md">
        Connect BSC wallet to mint . . .
      </Text>
    </>
  );
}
