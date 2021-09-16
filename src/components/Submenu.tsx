import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SidebarItem } from "../models/SidebarItem";

type SidebarLinkProps = {
  item: SidebarItem;
};

const SidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.75rem;
  font-size: 1.125rem;
  padding: 2rem;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    background-color: #1f1f1b;
    border-left: 4px solid #6d44dc;
  }
`;

const SidebarLabel = styled.span`
  margin-start: 1rem;
  margin-left: 1rem;
`;

const DropdownLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.75rem;
  font-size: 1.125rem;
  padding-left: 3rem;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    background-color: #6d44dc;
  }
`;

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
  const [subnav, setSubnav] = React.useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={showSubnav}>
        {item.icon}
        <SidebarLabel>{item.title}</SidebarLabel>
        <div>{item?.subnav && subnav ? item?.iconClosed : item?.iconOpened}</div>
      </SidebarLink>
      {subnav &&
        item?.subnav?.map((subnavItem, index) => {
          return (
            <DropdownLink key={index} to={subnavItem.path}>
              {subnavItem.icon}
              <SidebarLabel>{subnavItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default Submenu;
