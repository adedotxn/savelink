import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { toast } from "sonner";

import styles from "./dialog.module.css";

import {
  CheckIcon,
  Cross2Icon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useDialogStore } from "@utils/zustand/store";
import { useCreate } from "@utils/api";
import Multiselect from "./ui/multiselect";
import { useMultiSelect } from "@utils/hooks/use-Multiselect";
import { useLinkInfo } from "@utils/hooks/use-LinkInfo";
import { SavedLink } from "@utils/interface";

const Dialog = ({
  name,
  isLoading,
  error,
  storedData,
}: {
  name: string;
  isLoading: boolean;
  error: unknown;
  storedData: SavedLink[];
}) => {
  const dialog = useDialogStore((state) => state.dialog);
  const setDialog = useDialogStore((state) => state.setDialog);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (link.length === 0) {
      setTitle("");
    }
  }, [link]);

  const [editLink, setEditLink] = useState(false);

  let returnedCategories: string[] = [];

  if (error) {
    if (error instanceof Error) {
      console.log("creation error", error.message);
    } else {
      console.log(`Unexpected error in cr8 : ${error}`);
    }
  }

  if (!isLoading) {
    for (let i: number = 0; i < storedData.length; ++i) {
      const data = storedData[i]?.category;

      if (data !== undefined) returnedCategories.push(data);

      storedData[i].categories.forEach((data) => {
        returnedCategories.push(data);
      });
    }
  }

  const categories = [...new Set(returnedCategories)];
  //State for handling typed category
  const [typedCateg, setTypedCateg] = useState("");

  const { allSelected, selectedStore, setStore, toggleOption } =
    useMultiSelect();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedCateg(e.target.value);
  };

  const reset = () => {
    setTitle("");
    setLink("");
    setTypedCateg("");
    setStore({});
  };

  const createMutation = useCreate(toast, reset);

  const { generateLinkInfo, setGettingLinkInfo, infoLoading } = useLinkInfo(
    link,
    setTitle
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length === 0 || link.trim().length === 0)
      return toast.error("Empty Link/Title");

    let categories;
    if (typedCateg.length === 0 && allSelected.length > 0) {
      categories = allSelected;
    } else if (typedCateg.length > 0 && allSelected.length === 0) {
      categories = [typedCateg];
    } else if (typedCateg.length === 0 && allSelected.length === 0) {
      categories = ["default"];
    } else if (typedCateg.length > 0 && allSelected.length > 0) {
      categories = allSelected;
    }

    if (categories !== undefined) {
      createMutation.mutate({
        identifier: name,
        title,
        url: link,
        categories,
      });
    }

    closeDialog();
  };

  // logging mutation error if any
  if (createMutation.error) {
    if (createMutation.error instanceof Error) {
      console.error("Mutation error", createMutation.error);
    } else {
      console.error(`Unexpected error in mutation: ${createMutation.error}`);
    }
  }

  return (
    <RadixDialog.Root open={dialog} onOpenChange={setDialog}>
      <RadixDialog.Trigger asChild>
        <div className={styles.addBtn}>
          <PlusIcon />
        </div>
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.RadixDialogOverlay} />
        <RadixDialog.Content className={styles.RadixDialogContent}>
          <RadixDialog.Title className={styles.RadixDialogTitle}>
            Save URL
          </RadixDialog.Title>
          <RadixDialog.Description className={styles.RadixDialogDescription}>
            Type in a URL and select or type in category(ies) to save the URL
            in.
          </RadixDialog.Description>

          <form
            className={styles.form}
            id="input-form"
            onSubmit={onSubmit}
            action=""
          >
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              name="link"
              placeholder="Link"
              required
            />

            {title.length === 0 ? (
              <button
                className={styles.next__btn}
                type="button"
                onClick={() => {
                  if (link.length === 0) return toast.error("Type in a link");
                  generateLinkInfo();
                }}
              >
                Next
              </button>
            ) : (
              <></>
            )}

            {infoLoading ? (
              <span style={{ margin: ".8rem 0rem" }}>Getting...</span>
            ) : (
              <>
                {editLink ? (
                  <div className={styles.editLink}>
                    <input
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      name="title"
                      placeholder="Title"
                    />

                    <div
                      className={styles.confirmIcon}
                      onClick={() => {
                        if (title.length === 0)
                          return toast.error("Link needs a title");
                        setEditLink(false);
                      }}
                    >
                      <CheckIcon width="20" height="20" />
                    </div>
                  </div>
                ) : (
                  <div className={styles.editLink}>
                    <p>{title}</p>

                    {title.length > 0 ? (
                      <div
                        className={styles.confirmIcon}
                        onClick={() => setEditLink(true)}
                      >
                        <Pencil1Icon width="20" height="20" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </>
            )}

            {title.length > 0 ? (
              <>
                <section className={styles.category}>
                  <p>
                    Type in a new category to save to or select from
                    pre-existing
                  </p>

                  <div className={styles.add_category}>
                    <input
                      onChange={handleChange}
                      type="text"
                      placeholder='Example : "Software Eng. Links"'
                    />

                    <Multiselect
                      options={categories}
                      toggleOption={toggleOption}
                      selected={selectedStore}
                    />
                  </div>
                </section>

                <div
                  style={{
                    display: "flex",
                    gap: 25,
                    justifyContent: "flex-end",
                  }}
                  className={styles.submit}
                >
                  <button className={styles.submit__button} type="submit">
                    Save Link
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </form>

          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <RadixDialog.Close asChild>
              <button
                type="button"
                className={styles.IconButton}
                aria-label="Close"
              >
                <Cross2Icon width="29" height="29" />
              </button>
            </RadixDialog.Close>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
