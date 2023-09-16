"use client";

import React from "react";
import { CabinetGrotesk } from "@utils/font";
import { usePathname } from "next/navigation";

const Nolinks = () => {
  const pathname = usePathname();

  const action =
    pathname && pathname?.includes("bookmarked") ? "bookmarked" : "saved";
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        height: "50vh",
        // border: "1px solid red",
        width: "80vw",
      }}
      className={`${CabinetGrotesk.className}`}
    >
      <h2>
        You haven&apos;t {action} any link yet. <br /> Click the{" "}
        <strong>&quot;+&quot;</strong> button to start saving{" "}
      </h2>
    </div>
  );
};

export default Nolinks;
