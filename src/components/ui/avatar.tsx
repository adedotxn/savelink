"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import styles from "./avatar.module.css";

const SLAvatar = ({
  image,
  name,
}: {
  image: string | undefined;
  name: string;
}) => (
  <div className={styles.avatar} style={{ display: "flex", gap: 20 }}>
    <Avatar.Root className={styles.AvatarRoot}>
      <Avatar.Image className={styles.AvatarImage} src={image} alt={name} />
      <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
        {name[0]}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default SLAvatar;
