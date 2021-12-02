//import React, { FC } from "react";
//import { IconContext } from "react-icons";
import { FaCog } from "react-icons/fa";
import { RiFolderUserLine, RiAddCircleLine, RiCake3Line } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { MdCompareArrows } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { SidebarItem } from "../models/SidebarItem";

export const SidebarData: SidebarItem[] = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiOutlineHome />,
    iconClosed: <AiFillCaretDown />,
    iconOpened: <AiFillCaretUp />,
    subnav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <AiOutlineUser />
      },
      {
        title: "Money",
        path: "/overview/money",
        icon: <GrMoney />
      }
    ]
  },
  {
    title: "Mint",
    path: "/mint",
    icon: <RiAddCircleLine />
  },
  {
    title: "Portfolio",
    path: "/portfolio",
    icon: <RiFolderUserLine />
  },
  {
    title: "Stake",
    path: "/stake",
    icon: <RiCake3Line />
  },
  {
    title: "Swap",
    path: "/swap",
    icon: <MdCompareArrows />
  },
  {
    title: "Configurations",
    path: "/configurations",
    icon: <FaCog />
  }
];
