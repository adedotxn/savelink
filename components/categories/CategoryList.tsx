import * as ScrollArea from "@radix-ui/react-scroll-area";
import CloseSvg from "../svg/close";
import styles from "./CategoryList.module.css";

const CategoryList = ({
  TAGS,
  showList,
  setShowList,
  setSelected,
}: {
  TAGS: string[];
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSelected = (tag: string): void => {
    setSelected(tag);
    setShowList(false);
  };
  return (
    <>
      {showList ? (
        <ScrollArea.Root
          style={{ position: "absolute", bottom: "6rem" }}
          className={styles.ScrollAreaRoot}
        >
          <ScrollArea.Viewport className={styles.ScrollAreaViewport}>
            <div style={{ padding: "15px 20px" }}>
              <div className={styles.Text}>
                <p>Tags</p>
                <div onClick={() => setShowList(false)}>
                  <CloseSvg />
                </div>
              </div>
              {TAGS.map((tag) => (
                <div
                  onClick={() => handleSelected(tag)}
                  className={styles.Tag}
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            className={styles.ScrollAreaScrollbar}
            orientation="vertical"
          >
            <ScrollArea.Thumb className={styles.ScrollAreaThumb} />
          </ScrollArea.Scrollbar>

          <ScrollArea.Scrollbar
            className={styles.ScrollAreaScrollbar}
            orientation="horizontal"
          >
            <ScrollArea.Thumb className={styles.ScrollAreaThumb} />
          </ScrollArea.Scrollbar>

          <ScrollArea.Corner className={styles.ScrollAreaCorner} />
        </ScrollArea.Root>
      ) : null}
    </>
  );
};

export default CategoryList;
