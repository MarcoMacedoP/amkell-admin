import * as React from "react";
import { PageLabel } from "./PageLabel";

type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <section className="w-full flex h-screen">
        <aside className="w-1/3  bg-white block  py-4 shadow-sm lg:w-3/12">
          <header className="h-24 flex items-center px-2">
            <p className="text-lg text-gray-700 font-medium">Dashboard</p>
          </header>
          <PageLabel to="/" text="Paginas" />
          <PageLabel to="/materiales" text="Materiales" />
          <PageLabel to="/soluciones" text="Soluciones" />
        </aside>
        <main className=" flex-1  p-8">{children}</main>
      </section>
    </>
  );
};
