import React, { SetStateAction } from "react";
import * as DeleteDialog from "@radix-ui/react-alert-dialog";
import styles from "./deleteDialog.module.css";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteOption = ({
  id,
  title,
  deleteLink,
  closeDeleteDialog,
}: {
  id: number;
  title: string;
  deleteLink: (id: number) => void;
  closeDeleteDialog: () => void;
}) => {
  return (
    <div>
      <div className={styles.dialogOverlay}>
        <div className={styles.dialogContent}>
          <div>
            <h1 className={styles.title}>
              Are you absolutely sure you want to delete{" "}
              <span>&quot;{title}&quot;</span> ?
            </h1>
            <p className={styles.description}>
              This action cannot be undone. This will permanently delete your
              saved links and remove your data from our server.
            </p>
          </div>

          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <button
              onClick={closeDeleteDialog}
              className={styles.cancel__button}
            >
              Cancel
            </button>
            <button
              onClick={() => deleteLink(id)}
              className={styles.delete__button}
            >
              Yes, delete link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOption;
