import styles from "./Button.module.scss";
import React, { FC,ReactNode,ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined" | "alert";
  className?: string;
  children:ReactNode
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
