import styled from "styled-components";
import { Link as LinkRouter } from "@reach/router";
import { fadeIn } from "../../styles/animations";

export const Nav = styled.nav`
  align-items: center;
  background: #324047;
  border-top: 1px solid #324047;
  bottom: 0;
  display: flex;
  height: 75px;
  justify-content: space-around;
  left: 0;
  margin: 0 auto;
  max-width: 500px;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 1000;
`;

export const Link = styled(LinkRouter)`
  align-items: center;
  color: #717d85;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;

  &[aria-current] {
    color: #fdfcfa;

    &:after {
      ${fadeIn({ time: "0.5s" })};
      content: "·";
      position: absolute;
      bottom: 0;
      font-size: 34px;
      line-height: 20px;
    }
  }
`;
