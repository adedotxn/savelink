import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useCreateOnly, useDataGetter } from "../utils/api/api";
import styles from "../styles/target.module.css";
import { useRouter } from "next/router";

const ShareTarget = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const createMutation = useCreateOnly(toast);

  const { title, text } = router.query;
  // let text = "https://stackoverflow.blog/2022/03/30/best-practices-to-increase-the-speed-for-next-js-apps/"
  // let title = "Best Practices to Increase the speed of nextjs apps"

  const name: string = session?.user?.email!;
  let linkTitle: string = title ? title.toString() : "";
  let linkText: string = text ? text?.toString() : 'Link not returned';

  const [selected, setSelected] = useState("");
  const [retTitle, setRetTitle] = useState(linkTitle);
  const [retText, setRetText] = useState(linkText);
 

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
      category: selected === " ".trim() ? "Shared" : selected,
    });

    router.push(`/v1/${name}/`);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} action="">
          <div>
            <h3>Title</h3>
            <input
              onBlur={(e) => setRetTitle(e.target.value)}
              type="text"
              defaultValue={linkTitle}
            />
          </div>

          <div>
            <h3>Link</h3>
            <input
              onBlur={(e) => setRetText(e.target.value)}
              type="text"
              defaultValue={linkText}
            />
          </div>

          <div>
            <h3>Select or Add new category</h3>
            <input
              onChange={handleChange}
              type="text"
              placeholder='Example : "Software Eng. Links"'
            />
            <select value={selected} onChange={handleChange}>
              {categories.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <button onClick={saveLink}> Save </button>
        </form>
      </div>
    </>
  );
};

export default ShareTarget;
