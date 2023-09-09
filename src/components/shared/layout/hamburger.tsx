"use client";

import {
  HamburgerMenuIcon,
  Cross2Icon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import styles from "./hamburger.module.css";
import Logout from "../../ui/buttons/logout-btn";
import ThemeSwitcher from "../../ui/buttons/theme-switcher";
import { useTheme } from "@utils/context";

const Hamburger = ({ name }: { name: string }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <HamburgerMenuIcon width="23" height="23" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div>
            <ul>
              <Link href={`/board`}>
                <li
                  className={
                    pathname &&
                    !pathname.includes("categories") &&
                    !pathname.includes("bookmarked") &&
                    !pathname.includes("category")
                      ? styles.active
                      : ""
                  }
                >
                  Links
                  <span>
                    <ArrowTopRightIcon width={12} height={12} />
                  </span>
                </li>
              </Link>

              <Link href={`/bookmarked`}>
                <li
                  className={
                    pathname && pathname.includes(`/bookmarked`)
                      ? styles.active
                      : ""
                  }
                >
                  Bookmarks
                  <span>
                    <ArrowTopRightIcon width={12} height={12} />
                  </span>
                </li>
              </Link>

              <Link href={`/categories`}>
                <li
                  className={
                    pathname && pathname.includes(`/categories`)
                      ? styles.active
                      : ""
                  }
                >
                  Categories
                  <span>
                    <ArrowTopRightIcon width={12} height={12} />
                  </span>
                </li>
              </Link>
            </ul>

            <div className={styles.options}>
              <ThemeSwitcher />
              <Logout />
            </div>
          </div>

          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <Cross2Icon color="var(--text-color)" />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Hamburger;
