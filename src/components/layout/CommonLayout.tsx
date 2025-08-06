import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;