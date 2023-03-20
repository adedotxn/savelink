import styles from "./footer.module.css";
import { useState } from "react";
import Options from "./options";
import { CardStackPlusIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import Hamburger from "./hamburger";
import { SidePropsInterface } from "@utils/interface";
import { useDialogStore } from "@utils/zustand/store";

const Footer = ({ side, setSide, name }: SidePropsInterface) => {
  const setDialog = useDialogStore((state) => state.setDialog);

  const [options, setOptions] = useState(false);

  return (
    <div className={styles.footer}>
      {/* {side && <div></div>} */}

      <div className={styles.new_footer}>
        <div>
          <div>
            <Hamburger name={name} />
          </div>

          <div onClick={setDialog}>
            <CardStackPlusIcon width="23" height="23" />
          </div>

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
