"use client";

import React from "react";
import styles from "./deleteDialog.module.css";
import { revalidateAll } from "src/app/board/actions";

const DeleteOption = ({
  id,
  title,
  deleteLink,
  closeDeleteDialog,
}: {
  id: string;
  title: string;
  deleteLink: (id: string) => void;
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
              onClick={() => {
                deleteLink(id);
                revalidateAll();
              }}
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
