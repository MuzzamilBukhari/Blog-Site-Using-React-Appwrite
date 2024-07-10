import { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  onClick = () => {},
  className = "",
  ...props
}: {
  children: Readonly<ReactNode>;
  type: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} transition duration-200 ease-in-out transform hover:scale-105`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
