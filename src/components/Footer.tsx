//import { Button, Box, Text } from "@chakra-ui/react";
//import { useEthers, useEtherBalance } from "@usedapp/core";
import styled from "styled-components";
import {
  //React,
  FC
  //useState
} from "react";

//type Props = {
//handleReloadModal: any;
//};

const FooterDefault = styled.div`
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(15px);
  color: white;
  position: fixed;
  bottom: 0px;
`;

// add footer socials

const Footer: FC = () => {
  return (
    <>
      <FooterDefault className="footer">© 2021 Apefolio, Inc</FooterDefault>
    </>
  );
};

export default Footer;
