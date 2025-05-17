
import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

export const MainLayout = ({ children, hideNav = false, hideFooter = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <NavBar />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
