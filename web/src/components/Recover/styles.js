import styled from "styled-components";
import { Link as linkRouter } from "@material-ui/core";
import { efectoSize } from "../../styles/animations";

export const Form = styled.form`
  padding: 0px;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  text-align: center;
  background: #fefefe;
  padding: 35px;
  margin-top: 80px;
`;

export const Link = styled(linkRouter)`
  color: rgba(0, 0, 0, 0.65) !important;
  font-size: 11px;
`;

export const Error = styled.span`
  color: red;
  font-size: 14px;
  letter-spacing: 1px;
`;

export const OKMessage = styled.p`
  color: #19690a;
  font-size: 12px !important;
  margin-top: 10px;
  margin-bottom: 10px;
  ${efectoSize({ time: "3s" })};
`;
