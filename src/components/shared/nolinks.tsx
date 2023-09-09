"use client";

import React from "react";
import { CabinetGrotesk } from "@utils/font";

const Nolinks = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        height: "50vh",
      }}
      className={`${CabinetGrotesk.className}`}
    >
      <h2>
        You haven&apos;t saved any link yet. <br /> Click the{" "}
        <strong>&quot;+&quot;</strong> button to start saving{" "}
      </h2>
    </div>
  );
};

export default Nolinks;
