import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly, useDataGetter } from "../utils/api/api";
import styles from "../styles/target.module.css";
import { useRouter } from "next/router";
import Button from "../components/buttons/Button";
import CategoryList from "../components/categories/CategoryList";

const ShareTarget = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const createMutation = useCreateOnly(toast);

  const { title, text } = router.query;
  // let text = "https://stackoverflow.blog/2022/03/30/best-practices-to-increase-the-speed-for-next-js-apps/"
  // let title = "Best Practices to Increase the speed of nextjs apps"

  const name: string = session?.user?.email!;
  let linkTitle: string = title?.toString()!;
  let linkText: string = text?.toString()!;

  const [selected, setSelected] = useState("");
  const [retTitle, setRetTitle] = useState("");
  const [retText, setRetText] = useState("");

  useEffect(() => {
    setRetTitle(title?.toString()!);
    setRetText(text?.toString()!);
  }, [title, text]);

  function useData() {
    const { data, isLoading } = useDataGetter(name);
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
  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSelected(e.target.value);
      console.log("selected handlechange", e.target.value);
    },
    []
  );

  const saveLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    createMutation.mutate({
      identifier: name,
      title: retTitle,
      url: retText,
      categories: selected === " ".trim() ? ["Shared"] : [selected],
    });

    router.push(`/v1/${name}/`);
  };

  const [showList, setShowList] = useState<boolean>(false);
  const showCategoriesList = (e: any) => {
    e.preventDefault();
    setShowList(!showList);
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
                <Button options action={showCategoriesList}>
                  {selected === "" ? "Pick a tag" : `${selected}`}
                </Button>

                <CategoryList
                  TAGS={categories}
                  setShowList={setShowList}
                  showList={showList}
                  setSelected={setSelected}
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
