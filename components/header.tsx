import { useState } from "react";
import styles from "../styles/header.module.css";
import { useSearch } from "../utils/helpers/context";
import { SidePropsInterface } from "../utils/interface";
import Logout from "./buttons/logout";
import ThemeSwitcher from "./buttons/themeSwitcher";
import Options from "./options";
import MoreSvg from "./svg/moresvg";

const Header = ({ name }: { name: string }) => {
  const { search, setSearch } = useSearch();
  const [options, setOptions] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.hamburger}>📌</div>

      <div className={[styles.searchbar, "searchbar"].join(" ")}>
        <input
          type="text"
          placeholder="Search through links with title or URLs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <h2>{name}</h2>
        {/* <ThemeSwitcher /> */}
        <ThemeSwitcher />
        <Logout />

        <div
          onClick={() => setOptions(!options)}
          className={
            options ? [styles.active, styles.more].join(" ") : styles.more
          }
        >
          <MoreSvg />
        </div>
      </div>
      <Options options={options} name={name} />
    </header>
  );
};

export default Header;
