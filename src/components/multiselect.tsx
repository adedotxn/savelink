import styles from "./multiselect.module.css";
import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
const Multiselect = ({
  options,
  toggleOption,
  selected,
}: {
  options: string[];
  toggleOption: (option: string) => void;
  selected: { [key: string]: boolean };
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const allSelected = Object.keys(selected).filter(
    (key) => selected[key] === true
  );

  return (
    <>
      <div className={styles.dropdown__container}>
        <div className={styles.dropdown}>
          <div
            onMouseLeave={() => {
              setShowOptions(false);
            }}
            onClick={() => setShowOptions(!showOptions)}
            className={styles.dropdown__selected}
          >
            <div>
              {allSelected.length > 0
                ? `${allSelected.length} Selected`
                : "Pick a tag"}{" "}
            </div>
            <ChevronDownIcon />
          </div>

          <div
            className={styles.dropdown__options}
            onMouseEnter={() => {
              setShowOptions(true);
            }}
            onMouseLeave={() => {
              setShowOptions(false);
            }}
          >
            <ul
              className={
                showOptions ? styles.dropdown__open : styles.dropdown__close
              }
            >
              {options.map((category, index) => (
                <li
                  key={index}
                  className={styles.dropdown__option}
                  onClick={() => toggleOption(category)}
                >
                  <input
                    checked={selected[category]}
                    type="checkbox"
                    className={styles.dropdown__checkbox}
                  ></input>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.selected_list}>
        {allSelected.map((categ, idx) => (
          <p key={idx}>{categ}</p>
        ))}
      </div>
    </>
  );
};

export default Multiselect;
