import styles from "../styles/footer.module.css";
import HamburgerSvg from "./svg/hamburger";
import MoreSvg from "./svg/moresvg";
import { useDialog } from "../utils/helpers/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeSwitcher } from "./buttons/theme_switcher";
import AddSvg from "./svg/add";
import Logout from "./buttons/Logout";
import PinSvg from "./svg/pin";
import { useRef, useState } from "react";
import Options from "./options";
import { SidePropsInterface } from "../utils/interface";
import {
  HamburgerMenuIcon,
  CardStackPlusIcon,
  DotsVerticalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

const Footer = ({ side, setSide, name }: SidePropsInterface) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSidebar = () => {
    setSide(!side);
  };
  const router = useRouter();

  const { dialog, setDialog } = useDialog();
  const [options, setOptions] = useState(false);

  return (
    <div className={styles.footer}>
      {side && (
        <div className={styles.footer_nav}>
          <div>
            <Logout />
            <ThemeSwitcher />
          </div>
          <ul>
            <Link href={`/v1/${name}`}>
              <li
                className={
                  !router.pathname.includes("categories") &&
                  !router.pathname.includes("bookmarked") &&
                  !router.pathname.includes("category")
                    ? styles.active
                    : ""
                }
              >
                All Links
              </li>
            </Link>

            <Link href={`/v1/${name}/bookmarked`}>
              <li
                className={
                  router.pathname.includes(`/bookmarked`) ? styles.active : ""
                }
              >
                Starred
              </li>
            </Link>

            <Link href={`/v1/${name}/categories`}>
              <li
                className={
                  router.pathname.includes(`/categories`) ? styles.active : ""
                }
              >
                Categories
              </li>
            </Link>
          </ul>
        </div>
      )}

      <div className={styles.new_footer}>
        <div>
          <div onClick={handleSidebar}>
            <HamburgerMenuIcon />
            {/* <HamburgerSvg /> */}
          </div>

          <div onClick={() => setDialog(!dialog)}>
            <CardStackPlusIcon />
          </div>

          <div>
            <MagnifyingGlassIcon />
          </div>

          <div onClick={() => setOptions(!options)}>
            <DotsVerticalIcon />
          </div>
        </div>
      </div>

      <Options options={options} name={name} />
    </div>
  );
};

export default Footer;
