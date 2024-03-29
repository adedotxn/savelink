"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SearchContextData, ThemeContextData } from "./context.interface";

//defaukt values
const themeContextDefaultValue: ThemeContextData = {
  theme: false,
  switchTheme: () => null,
};

const searchContextDefaultValue: SearchContextData = {
  search: "",
  setSearch: () => null,
};

//Contexts

export const ThemeContext = createContext<ThemeContextData>(
  themeContextDefaultValue
);
export const SearchContext = createContext<SearchContextData>(
  searchContextDefaultValue
);

//Custom hooks

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useSearch = () => {
  return useContext(SearchContext);
};

//(daddy) Context Provider
export const UtilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //theme logic
  const [theme, setTheme] = useState(false);
  function getCurrentTheme() {
    let theme;

    if (
      localStorage.getItem("savelink-theme") === null ||
      localStorage.getItem("savelink-theme") === undefined
    ) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      theme = `${localStorage.getItem("savelink-theme")}`;
    }

    return theme;
  }

  function loadTheme(theme: string) {
    const root = document.querySelector(":root");
    root?.setAttribute("color-scheme", `${theme}`);
  }

  useEffect(() => {
    loadTheme(getCurrentTheme());
  }, [theme]);

  const switchTheme = () => {
    let theme = getCurrentTheme();
    theme === "dark" ? (theme = "light") : (theme = "dark");
    localStorage.setItem("savelink-theme", `${theme}`);
    loadTheme(theme);
    const root = document.querySelector(":root");

    root?.getAttribute("color-scheme") === "dark"
      ? setTheme(true)
      : setTheme(false);
  };

  //search logic
  const [search, setSearch] = useState<string>("");

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <SearchContext.Provider value={{ search, setSearch }}>
        {children}
      </SearchContext.Provider>
    </ThemeContext.Provider>
  );
};
