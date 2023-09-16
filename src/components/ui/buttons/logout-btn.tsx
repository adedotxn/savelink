"use client";

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.css";
import { ExitIcon } from "@radix-ui/react-icons";
import Button from "./base-button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Logout = () => {
  const router = useRouter();

  const handleSignOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/");
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button className={styles.btn} onClick={handleSignOut}>
            <ExitIcon width={20} height={20} color="var(--text-color)" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
            Sign Out
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Logout;
