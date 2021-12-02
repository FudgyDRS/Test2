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

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 8vh;
  background-color: #141b25;
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: 100hw;
    height: 100vh;
    background-color: #141b25;
    position: fixed;
    top 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 6vh;
  font-size: 1.25rem;
  margin-left: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  direction: row;
  background-color: #141b25;
  justify-content: space-between;
`;

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Header className="headerBar">
        <Nav>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineMenu />
          </NavIcon>
        </Nav>
        <ChakraProvider theme={theme}>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </ChakraProvider>
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
