import styles from "./Button.module.scss";
import React, { FC } from "react";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<HTMLButtonElement> {
  variant?: "primary" | "outlined" | "alert";
  className: string;
}
export const Button: FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...other
}) => {
  const variantClassName = styles[variant];

  return (
    <button
      {...other}
      className={`${variantClassName} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};
