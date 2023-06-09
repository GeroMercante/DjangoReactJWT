import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <BoxFooter>
      <h3>Footer</h3>
    </BoxFooter>
  );
};

const BoxFooter = styled.footer`
  width: 100%;
  height: 225px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
