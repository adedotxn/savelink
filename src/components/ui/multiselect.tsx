import styles from "./multiselect.module.css";
import { useState } from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
const Multiselect = ({
  options,
  toggleOption,
  selected,
}: {
  options: string[];
  toggleOption: (option: string) => void;
  selected: { [key: string]: boolean };
}) => {
  type Options = "open" | "closed";
  const [showOptions, setShowOptions] = useState<Options>("closed");
  const allSelected = Object.keys(selected).filter(
    (key) => selected[key] === true
  );

  return (
    <>
      <section className={styles.dropdown}>
        <button
          type="button"
          onClick={() =>
            setShowOptions((curr: Options) =>
              curr === "closed" ? "open" : "closed"
            )
          }
          className={styles.dropdown__select}
        >
          <div>
            {allSelected.length > 0
              ? `${allSelected.length} Selected`
              : "Select a tag"}{" "}
          </div>

          <div>
            <CaretSortIcon width="16px" height="16px" />
          </div>
        </button>

        <div className={styles.dropdown__options}>
          <ul
            className={
              showOptions === "open"
                ? styles.dropdown__open
                : styles.dropdown__close
            }
          >
            {options.map((category, index) => (
              <li
                key={index}
                className={`${
                  selected[category]
                    ? styles.option_selected
                    : styles.dropdown__option
                }`}
                onClick={() => toggleOption(category)}
              >
                <input
                  checked={selected[category]}
                  type="checkbox"
                  className={styles.hidden}
                ></input>
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>

        {showOptions === "closed" ? (
          <section className={styles.selected_list}>
            {allSelected.length > 0 ? (
              <>
                <p>{allSelected[0]}</p> <p>{allSelected[1]}</p>{" "}
                {allSelected.length > 2 ? (
                  <p>+{allSelected.length - 2}</p>
                ) : null}
              </>
            ) : (
              <></>
            )}
          </section>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default Multiselect;