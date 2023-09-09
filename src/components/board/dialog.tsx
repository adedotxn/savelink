"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
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
import Multiselect from "../ui/multiselect";
import { useMultiSelect } from "@utils/hooks/use-Multiselect";
import { useLinkInfo } from "@utils/hooks/use-LinkInfo";
import Button from "../ui/buttons/base-button";
import Spinner from "../ui/spinner";
import { save } from "src/app/board/actions";

const Dialog = ({
  name,
  categories,
}: {
  name: string;
  categories: string[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
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

  const { allSelected, selectedStore, setStore, toggleOption } =
    useMultiSelect();

  const reset = () => {
    setTitle("");
    setLink("");
    setStore({});
  };

  const { generateLinkInfo, infoLoading } = useLinkInfo(link, setTitle);
  const [formResponse, setFormResponse] = useState<{
    status: string;
    message: string;
  }>();

  const onSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        data[key] = value as string;
      });

      const res = await save({ name, title, allSelected, formData });
      setFormResponse(res);
    }
  };

  useEffect(() => {
    if (formResponse?.status === "success") {
      toast.success(formResponse.message);
      reset();
      closeDialog();
    }

    if (formResponse?.status === "error") {
      toast.error(formResponse?.message);
    }
  }, [formResponse]);

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
            // onSubmit={onSubmit}
            action={onSubmit}
            ref={formRef}
          >
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              name="url"
              placeholder="Link"
              required
            />

            {title.length === 0 ? (
              <Button
                className={styles.next__btn}
                type="button"
                onClick={() => {
                  if (link.length === 0) return toast.error("Type in a link");
                  generateLinkInfo();
                }}
                icon={infoLoading ? <Spinner /> : null}
              >
                Next
              </Button>
            ) : (
              <></>
            )}

            {!infoLoading && (
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
                      type="text"
                      name="categories"
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
                    Savee Link
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
