import { Options } from "@components/svg";
import { PropsWithChildren } from "react";

type ButtonProps = {
  color?: string;
  bg?: string;
  borderColor?: string;
  borderWidth?: number;
  action?: (e: any) => void;
  width?: string;
  padding?: string;
  margin?: string;
  options?: boolean;
  textSize?: string;
  type?: "button" | "submit" | "reset" | undefined;
};
const Button = ({
  color,
  borderColor = "black",
  borderWidth = 0,
  children,
  action = (e: any) => {},
  width = "fit-content",
  padding = ".2rem 1rem",
  margin = ".3rem 0rem",
  options = false,
  textSize = "15px",
  type = "button",
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={action}
      style={{
        backgroundColor: `var(--background)`,
        color: `${color === undefined ? `var(--text-color)` : `${color}`}`,
        border: `${borderWidth}px solid ${borderColor}`,
        cursor: "pointer",
        width: `${width}`,
        padding: `${padding}`,
        margin: `${margin}`,
        display: "flex",
        alignItems: "center",
        fontSize: `${textSize}`,
      }}
      type={type}
    >
      {children}

      {options && <Options />}
    </button>
  );
};

export default Button;
