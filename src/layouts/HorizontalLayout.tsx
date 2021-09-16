import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

const Screen = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: black;
`;

export default function HorizontalLayout({ children }: Props) {
  return (
    <Screen>
      <Flex flexDirection="row">{children}</Flex>
    </Screen>
  );
}
