import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";

import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import ConnectButton from "./ConnectButton";
import AccountModal from "./AccountModal";
import "@fontsource/inter";
import HorizontalLayout from "../layouts/HorizontalLayout";

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  background-color: black;
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: 250px;
    height: 100vh;
    background-color: black;
    position: fixed;
    top 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

const ConnectButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
  background-color: black;
  padding-right: 2rem;
`;

const Header = styled.div`
  display: flex;
  gap: 80vmax;
  align-items: center;
  direction: row;
  height: 5rem;
  background-color: black;
`;

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Header>
        <Nav>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineMenu />
          </NavIcon>
        </Nav>
        <ConnectButtonBox>
          <ChakraProvider theme={theme}>
            <ConnectButton handleOpenModal={onOpen} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
          </ChakraProvider>
        </ConnectButtonBox>
      </Header>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
