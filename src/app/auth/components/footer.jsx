// @flow
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`padding: 0 20px 10px 20px;`;

const Hr = styled.hr`
  margin-bottom: 0;
  margin-top: 10px;
`;

const Footer = ({ children }: { children: any }) =>
  <Wrapper className="footer">
    <Hr />
    <div className="row">
      {children}
    </div>
  </Wrapper>;

export default Footer;
