import { PropsWithChildren } from "react";
import Options from "../svg/options";

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
};
const Button = ({
  color,
  borderColor = "black",
  borderWidth = 0,
  children,
  action = (e: any) => {
    e.preventDefault();
  },
  width = "fit-content",
  padding = ".2rem 1rem",
  margin = ".3rem 0rem",
  options = false,
  textSize = "15px",
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
    >
      {children}

      {options && <Options />}
    </button>
  );
};

export default Button;
