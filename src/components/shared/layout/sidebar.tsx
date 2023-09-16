"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import styles from "@styles/sidebar.module.css";
import ArchiveActive from "../../ui/svg/active/archive";
import CategActive from "../../ui/svg/active/categ";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ArchiveSvg } from "@components/ui/svg/archive";
import { CategoriesSvg } from "@components/ui/svg/categoriesvg";

const Sidebar = ({ name }: { name: string }) => {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [hovering, setHovering] = useState(false);

  function mouseOver() {
    setHovering(true);
    // navRef?.current?.classList.add("hoverOn");
  }

  function mouseLeave() {
    setHovering(false);
    // navRef?.current?.classList.remove("hoverOn");
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.sidebar} ${
          hovering ? styles.expand : styles.contract
        }`}
      >
        <button
          onClick={hovering ? mouseLeave : mouseOver}
          className={` ${styles.control}  ${
            hovering ? styles.expand_control : styles.contract_control
          }`}
        >
          {hovering ? (
            <DoubleArrowLeftIcon color="white" />
          ) : (
            <DoubleArrowRightIcon color="white" />
          )}
        </button>

        <ul
        // onMouseOver={mouseOver}
        // onMouseLeave={mouseLeave}
        // onClick={mouseOver}
        >
          <Link href={`/board`}>
            <li className={hovering ? styles.sidebar__li : ""}>
              <div>
                {pathname &&
                !pathname.includes("categories") &&
                !pathname.includes("bookmarked") &&
                !pathname.includes("category") ? (
                  <ArchiveActive />
                ) : (
                  <ArchiveSvg />
                )}
              </div>
              <span
                className={`${styles.yo} ${
                  hovering ? styles.show : styles.hide
                }`}
              >
                Links{" "}
              </span>
            </li>
          </Link>

          <Link href={`/bookmarked`}>
            <li className={""}>
              <div>
                {pathname && pathname.includes("bookmarked") ? (
                  <BookmarkFilledIcon
                    width="22px"
                    height="22px"
                    color="white"
                  />
                ) : (
                  <BookmarkIcon width="22px" height="22px" color="white" />
                )}
              </div>
              <span
                className={`${styles.yo} ${
                  hovering ? styles.show : styles.hide
                }`}
              >
                Bookmarks
              </span>
            </li>
          </Link>

          <Link href={`/categories`}>
            <li className={hovering ? styles.sidebar__li : ""}>
              <div>
                {(pathname && pathname.includes("categories")) ||
                (pathname && pathname.includes("category")) ? (
                  <CategActive />
                ) : (
                  <CategoriesSvg />
                )}
              </div>
              <span
                className={`${styles.yo} ${
                  hovering ? styles.show : styles.hide
                }`}
              >
                Categories
              </span>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};
export default Sidebar;
