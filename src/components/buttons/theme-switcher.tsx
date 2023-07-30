import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "@utils/context";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import styles from "./tooltip.module.css";
import Button from "./base-button";

const ThemeSwitcher = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            icon={
              theme ? (
                <SunIcon width={20} height={20} color="var(--text-color)" />
              ) : (
                <MoonIcon width={20} height={20} color="var(--text-color)" />
              )
            }
            className={styles.btn}
            onClick={switchTheme}
          ></Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
            Switch Theme
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ThemeSwitcher;
