import styles from "./Message.module.scss";
import React, { FC } from "react";

export const Message = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={`${styles.message} ${props.className ? props.className : ""}`}
    >
      {children}
    </p>
  );
});

Message.displayName = "Message";
