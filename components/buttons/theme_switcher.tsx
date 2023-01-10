import { useTheme } from "../../utils/helpers/context";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export const ThemeSwitcher = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <button onClick={switchTheme}>
      {theme ? (
        <SunIcon width={20} height={20} color="white" />
      ) : (
        <MoonIcon width={20} height={20} />
      )}
    </button>
  );
};
