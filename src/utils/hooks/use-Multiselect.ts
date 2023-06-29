import { useState } from "react";

export const useMultiSelect = () => {
  const [selectedStore, setStore] = useState<{ [key: string]: boolean }>({});
  const toggleOption = (category: string) => {
    if (selectedStore[category]) {
      setStore({
        ...selectedStore,
        [category]: false,
      });
    } else {
      setStore({
        ...selectedStore,
        [category]: true,
      });
    }

    console.log("clibked");
  };
  const allSelected = Object.keys(selectedStore).filter(
    (key) => selectedStore[key] === true
  );

  return { selectedStore, allSelected, setStore, toggleOption };
};
