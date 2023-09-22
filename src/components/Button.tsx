import { PropsWithChildren } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  variant?: string;
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  variant,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={variant ? `btn-${variant}` : "btn-primary"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
