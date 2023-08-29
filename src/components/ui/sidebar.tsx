import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import styles from "@styles/dashboard.module.css";
import ArchiveActive from "../svg/active/archive";
import BookmarkActive from "../svg/active/bookmarked";
import CategActive from "../svg/active/categ";
import { ArchiveSvg, BookmarkSvg, CategoriesSvg } from "../svg";

const Sidebar = ({ name }: { name: string }) => {
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
              {pathname &&
              !pathname.includes("categories") &&
              !pathname.includes("bookmarked") &&
              !pathname.includes("category") ? (
                <ArchiveActive />
              ) : (
                <ArchiveSvg />
              )}
            </div>
            <span className={hovering ? "show" : "hide"}>All links </span>
          </li>
        </Link>

        <Link href={`/bookmarked`}>
          <li className={hovering ? styles.sidebar__li : ""}>
            <div>
              {pathname && pathname.includes("bookmarked") ? (
                <BookmarkActive />
              ) : (
                <BookmarkSvg />
              )}
            </div>
            <span className={hovering ? "show" : "hide"}>Bookmarks</span>
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
            <span className={hovering ? "show" : "hide"}>Categories</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default Sidebar;
