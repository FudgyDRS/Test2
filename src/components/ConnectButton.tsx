import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "../hooks";
import { formatEther } from "@ethersproject/units";
import Identicon from "../Identicon";

//import { DAppProvider } from "@usedapp/core";
//import { ChainId } from "@usedapp/core";

import { DAppProvider } from "../providers";
import { ChainId } from "../constants";
import { NATIVE_CURRENCY } from "../constants";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box display="flex" alignItems="center" background="gray.700" borderRadius="xl" py="0">
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)}
          {chainId == 4002
            ? " tFTM"
            : chainId == 250
            ? " FTM"
            : chainId == 97
            ? " tBNB"
            : chainId == 56
            ? " BNB"
            : " ETH"}
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700"
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
  );
}
