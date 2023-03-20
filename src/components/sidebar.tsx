import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "@styles/dashboard.module.css";
import ArchiveActive from "./svg/active/archive";
import BookmarkActive from "./svg/active/bookmarked";
import CategActive from "./svg/active/categ";
import ArchiveSvg from "./svg/archive";
import BookmarkSvg from "./svg/bookmark";
import CategoriesSvg from "./svg/categoriesvg";

const Sidebar = ({ name }: { name: string }) => {
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const [hovering, setHovering] = useState(false);

  function mouseOver() {
    setHovering(true);
    navRef?.current?.classList.add("hoverOn");
  }

  function mouseLeave() {
    setHovering(false);
    navRef?.current?.classList.remove("hoverOn");
  }

  return (
    <nav ref={navRef} className={[styles.sidebar, "hide"].join(" ")}>
      <ul onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
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
            <span className={hovering ? "show" : "hide"}>All links </span>
          </li>
        </Link>

        <Link href={`/v1/${name}/bookmarked`}>
          <li className={hovering ? styles.sidebar__li : ""}>
            <div>
              {router.pathname.includes("bookmarked") ? (
                <BookmarkActive />
              ) : (
                <BookmarkSvg />
              )}
            </div>
            <span className={hovering ? "show" : "hide"}>Starred</span>
          </li>
        </Link>

        <Link href={`/v1/${name}/categories`}>
          <li className={hovering ? styles.sidebar__li : ""}>
            <div>
              {router.pathname.includes("categories") ||
              router.pathname.includes("category") ? (
                <CategActive />
              ) : (
                <CategoriesSvg />
              )}
            </div>
            <span className={hovering ? "show" : "hide"}>Categories</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default Sidebar;
