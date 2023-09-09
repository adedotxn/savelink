import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "@styles/sidebar.module.css";
import ArchiveActive from "../../ui/svg/active/archive";
import BookmarkActive from "../../ui/svg/active/bookmarked";
import CategActive from "../../ui/svg/active/categ";
import { ArchiveSvg, BookmarkSvg, CategoriesSvg } from "../../ui/svg";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

const Sidebar = ({ name }: { name: string }) => {
  const navRef = useRef<HTMLElement>(null);
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
                {!router.pathname.includes("categories") &&
                !router.pathname.includes("bookmarked") &&
                !router.pathname.includes("category") ? (
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
                {router.pathname.includes("bookmarked") ? (
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
                Bookmarkss
              </span>
            </li>
          </Link>

          <Link href={`/categories`}>
            <li className={hovering ? styles.sidebar__li : ""}>
              <div>
                {router.pathname.includes("categories") ||
                router.pathname.includes("category") ? (
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
