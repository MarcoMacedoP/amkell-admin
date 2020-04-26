import * as React from "react";
import { Link } from "react-router-dom";

type LinkCardProps = {
  title: string;
  desc: string;
  url: string;
};
/**
 * A card that redirects to an url
 *
 */
export const LinkCard: React.FC<LinkCardProps> = ({ title, desc, url }) => {
  return (
    <Link
      to={url}
      className="bg-gray-200 w-64 block transform p-4 transition-transform duration-200 ease-in-out rounded-md hover:scale-105"
    >
      <p className="mb-1">
        <strong>{title}</strong>
      </p>
      <p className="text-gray-600">{desc}</p>
    </Link>
  );
};
