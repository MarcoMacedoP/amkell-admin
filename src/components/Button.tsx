import * as React from "react";

type ButtonProps = {
  onClick: () => void;
  type?: "primary" | undefined;
  text: string;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type,
  className,
}) => {
  return (
    <button
      className={`animation-init block rounded-md  transition-colors duration-200 ease-in p-2 ${
        type
          ? type === "primary"
            ? "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-700 focus:bg-blue-200"
            : ""
          : "border-2 border-blue-500 hover:bg-blue-200 active:bg-blue-200 focus:bg-blue-200"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
