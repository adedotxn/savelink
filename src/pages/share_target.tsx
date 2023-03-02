import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly, useDataGetter } from "@utils/api";
import styles from "@styles/target.module.css";
import { useRouter } from "next/router";
import Multiselect from "@components/multiselect";
import { AxiosResponse } from "axios";

const ShareTarget = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const createMutation = useCreateOnly(toast);

  const { title, text } = router.query;

  const name: string = session?.user?.email!;

  const [retTitle, setRetTitle] = useState("");
  const [retText, setRetText] = useState("");

  useEffect(() => {
    setRetTitle(title?.toString()!);
    setRetText(text?.toString()!);
  }, [title, text]);

  function useData() {
    const result = useDataGetter(name);
    const data = result.data as AxiosResponse<any, any>;
    const isLoading: boolean = result.isLoading;
    return { data, isLoading };
  }

  const storedData = useData();
  const data = storedData?.data?.data;
  const isLoading = storedData.isLoading;

  let returnedCategories: string[] = [];
  if (!isLoading) {
    for (let i: number = 0; i < data.length; ++i) {
      returnedCategories.push(data[i].category);
    }
  }
  const categories = [...new Set(returnedCategories)];

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
  };
  const allSelected = Object.keys(selectedStore).filter(
    (key) => selectedStore[key] === true
  );

  const [typedCateg, setTypedCateg] = useState("");
  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setTypedCateg(e.target.value);
    },
    []
  );

  const saveLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();

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
        title: retTitle,
        url: retText,
        categories,
      });
    }

    router.replace(`/board`);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} action="">
          <div>
            <h3>Title</h3>
            <input
              onChange={(e) => setRetTitle(e.target.value)}
              type="text"
              value={retTitle}
            />
          </div>

          <div>
            <h3>Link</h3>
            <input
              onChange={(e) => setRetText(e.target.value)}
              type="text"
              value={retText}
            />
          </div>

          <div>
            <h3>Select or Add new category</h3>
            <input
              onChange={handleChange}
              type="text"
              placeholder='Example : "Software Eng. Links"'
            />
            {!isLoading ? (
              <>
                <Multiselect
                  options={categories}
                  toggleOption={toggleOption}
                  selected={selectedStore}
                />
              </>
            ) : (
              <p>loading..</p>
            )}
          </div>
          <button onClick={saveLink}> Save </button>
        </form>
      </div>
    </>
  );
};

export default ShareTarget;
