import React, { FC } from "react";
import { IconContext } from "react-icons";
import { FaCog } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
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
    title: "Configurations",
    path: "/configurations",
    icon: <FaCog />
  }
];
