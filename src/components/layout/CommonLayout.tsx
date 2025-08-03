import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
