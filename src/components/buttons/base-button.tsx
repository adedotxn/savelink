import { Options } from "@components/svg";
import { PropsWithChildren } from "react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element | null;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, icon, className, ...rest } = props;
  return (
    <button className={`${styles.default} ${className} `} {...rest}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
