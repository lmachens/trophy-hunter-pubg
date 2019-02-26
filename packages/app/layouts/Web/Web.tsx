import React, { FunctionComponent } from 'react';
import Header from 'components/Header';

const Web: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Web;
