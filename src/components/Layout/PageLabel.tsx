import * as React from "react";
import { Link, useRouteMatch } from "react-router-dom";
type PageLabelProps = {
  to: string;
  text: string;
};

export const PageLabel: React.FC<PageLabelProps> = ({ to, text }) => {
  const isRouteActive = useRouteMatch({
    path: to,
  });
  return (
    <>
      <Link
        to={to}
        className={` pl-2 overflow-hidden block rounded-md h-12 flex justify-between items-center text-gray-600 transition-opacity duration-200 ease-in 
                   hover:opacity-50 my-2 ${
                     isRouteActive && "text-gray-800 bg-blue-100"
                   }`}
      >
        {text}
        {isRouteActive && (
          <span className="h-full block w-2 bg-blue-500 animation-init" />
        )}
      </Link>
    </>
  );
};
