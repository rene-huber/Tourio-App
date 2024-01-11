import styled from "styled-components";
import LoginButton from "./LoginButton";

const Headline = styled.h1`
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  margin: 0;
  padding: 20px;
  text-align: center;
  z-index: 1;
`;

export default function TitleBar() {
  return (
    <>
      <Headline>Tourio</Headline>
      <LoginButton />
    </>
  );
}
