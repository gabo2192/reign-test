import React from "react";
import Header from "./header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main__container">{children}</main>
    </>
  );
};

export default Layout;
