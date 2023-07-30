import { useState } from "react";
import styles from "./header.module.css";
import Logout from "./buttons/logout-btn";
import ThemeSwitcher from "./buttons/theme-switcher";
import Options from "./options";
import { useSearch } from "@utils/context";
import SLAvatar from "./ui/avatar";
import { MoreSvg } from "./svg";
import Button from "./buttons/button";

const Header = ({
  user,
}: {
  user: { mail: string; name: string; image: string | undefined };
}) => {
  const { search, setSearch } = useSearch();
  const [options, setOptions] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.avatar}>
        <SLAvatar image={user.image} name={user.name} />
      </div>

      <div className={[styles.searchbar, "searchbar"].join(" ")}>
        <input
          type="text"
          placeholder="Search through links with title or URLs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <Logout />

        <Button
          onClick={() => setOptions(!options)}
          icon={<MoreSvg />}
          className={
            options ? [styles.active, styles.more].join(" ") : styles.more
          }
        ></Button>

        {/* <ThemeSwitcher /> */}
      </div>
      <Options options={options} setOptions={setOptions} name={user.name} />
    </header>
  );
};

export default Header;
