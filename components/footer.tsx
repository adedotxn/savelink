import styles from "../styles/footer.module.css";
import { useDialog } from "../utils/helpers/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeSwitcher } from "./buttons/theme_switcher";
import { useRef, useState } from "react";
import Options from "./options";
import { SidePropsInterface } from "../utils/interface";
import {
  HamburgerMenuIcon,
  CardStackPlusIcon,
  DotsVerticalIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import Hamburger from "./hamburger";

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
      {/* {side && <div></div>} */}

      <div className={styles.new_footer}>
        <div>
          <div>
            <Hamburger name={name} />
          </div>

          <div onClick={() => setDialog(!dialog)}>
            <CardStackPlusIcon width="23" height="23" />
          </div>
          {/* 
          <div>
            <MagnifyingGlassIcon width="23" height="23" />
          </div> */}

          <div onClick={() => setOptions(!options)}>
            <DotsVerticalIcon width="23" height="23" />
          </div>
        </div>
      </div>

      <Options options={options} name={name} />
    </div>
  );
};

export default Footer;
