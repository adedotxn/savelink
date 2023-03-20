import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { toast } from "react-hot-toast";

import styles from "./dialog.module.css";

import { CardStackPlusIcon, Cross2Icon } from "@radix-ui/react-icons";
import Multiselect from "./multiselect";
import { useDialogStore } from "@utils/zustand/store";
import { useCreate } from "@utils/api";
import { useLinkInfo, useMultiSelect } from "@utils/hooks";

const Dialog = ({
  name,
  isLoading,
  error,
  storedData,
}: {
  name: string;
  isLoading: boolean;
  error: unknown;
  storedData: any;
}) => {
  const dialog = useDialogStore((state) => state.dialog);
  const setDialog = useDialogStore((state) => state.setDialog);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

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
      returnedCategories.push(storedData[i].category);
    }
  }

  const categories = [...new Set(returnedCategories)];

  //State for handling typed category
  const [typedCateg, setTypedCateg] = useState("");

  const { allSelected, selectedStore, setStore, toggleOption } =
    useMultiSelect();

  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setTypedCateg(e.target.value);
    },
    []
  );

  const reset = () => {
    setTitle("");
    setLink("");
    setTypedCateg("");
    setStore({});
  };

  const createMutation = useCreate(toast, reset);

  const { generateLinkInfo, gettingLinkInfo, setGettingLinkInfo, infoLoading } =
    useLinkInfo(link, setTitle);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: string = name;
    if (title.trim().length === 0 || link.trim().length === 0) return;

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
      console.log("mutation error", createMutation.error);
    } else {
      console.log(`Unexpected error in mutation: ${createMutation.error}`);
    }
  }

  return (
    <RadixDialog.Root open={dialog} onOpenChange={setDialog}>
      <RadixDialog.Trigger asChild>
        <div className={styles.cardStack}>
          <CardStackPlusIcon width="20" height="20" color="black" />
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
            {/* <input ref={titleField} name="title" placeholder="Title" /> */}

            <div className={styles.link_info__btns}>
              <button type="button" onClick={() => generateLinkInfo()}>
                Generate Link Info
              </button>

              <button
                type="button"
                onClick={() =>
                  setGettingLinkInfo({ manually: true, opengraph: false })
                }
              >
                Type it in manually
              </button>
            </div>

            {infoLoading ? (
              <span style={{ margin: ".8rem 0rem" }}>Getting...</span>
            ) : (
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                placeholder="Title"
              />
            )}

            <section className={styles.category}>
              <p>
                Type in a new category to save to or select from pre-existing
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
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
              className={styles.submit}
            >
              <button className={styles.submit__button} type="submit">
                Save Link
              </button>
            </div>
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