import styles from "../styles/dashboard.module.css";
import { useDialog } from "../utils/helpers/context";
import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog } from "react-dialog-polyfill";
import { Close } from "./buttons/close_dialog";
import { useCreate, useDataGetter } from "../utils/api/api";
import { Toaster, toast } from "react-hot-toast";
import Button from "./buttons/Button";
import CategoryList from "./categories/CategoryList";

const CustomDialog = ({
  name,
  isLoading,
  error,
  storedData,
}: {
  name: string;
  isLoading: boolean;
  error: unknown;
  storedData: any;
}) => {
  const { dialog, setDialog, toggleDialog } = useDialog();

  //keeping track of the input field and clearing onSettled
  const urlField = useRef() as MutableRefObject<HTMLInputElement>;
  const titleField = useRef() as MutableRefObject<HTMLInputElement>;

  // const { isLoading, error, data } = useDataGetter(name);
  // const storedData = data?.data;
  let returnedCategories: string[] = [];

  if (error) {
    if (error instanceof Error) {
      console.log("creation error", error.message);
    } else {
      console.log(`Unexpected error in cr8 : ${error}`);
    }
  }

  if (!isLoading) {
    for (let i: number = 0; i < storedData.length; ++i) {
      returnedCategories.push(storedData[i].category);
    }
  }

  const categories = [...new Set(returnedCategories)];

  //logic for selecting a category from the dropdown and setting it to a state to pass to out db
  const [selected, setSelected] = useState("");
  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSelected(e.target.value);
      console.log("selected handlechange", e.target.value);
    },
    []
  );

  const resetForm = () => {
    urlField.current.value = "";
    titleField.current.value = "";
  };

  const createMutation = useCreate(setDialog, toast, resetForm);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: string = name;
    const data = new FormData(event.target as HTMLFormElement);
    let inputedTitle: string = data.get("title")?.toString() || "";
    let inputedLink: string = data.get("link")?.toString()!;

    createMutation.mutate({
      identifier: name,
      title: inputedTitle,
      url: inputedLink,
      category: selected === "".trim() ? "default" : selected,
    });
    // console.log("selected", selected)
  };

  //logging mutation error if any
  if (createMutation.error) {
    if (createMutation.error instanceof Error) {
      console.log("mutation error", createMutation.error);
    } else {
      console.log(`Unexpected error in mutation: ${createMutation.error}`);
    }
  }

  const [showList, setShowList] = useState<boolean>(false);
  const showCategoriesList = () => {
    setShowList(!showList);
  };

  return (
    <Dialog className={styles.dialog} open={dialog}>
      <div className={styles.close_btn}>
        <Close setDialog={setDialog} />
      </div>
      <form id="input-form" onSubmit={onSubmit} action="">
        <input ref={titleField} name="title" placeholder="Title" />
        <input ref={urlField} name="link" placeholder="Link" required />

        <section className={styles.category}>
          <p>Type in a new category to save to or select from pre-existing</p>

          <div className={styles.add_category}>
            <input
              onChange={handleChange}
              type="text"
              placeholder='Example : "Software Eng. Links"'
            />

            <Button options action={showCategoriesList}>
              {selected === "" ? "Pick a tag" : `${selected}`}
            </Button>

            <CategoryList
              TAGS={categories}
              setShowList={setShowList}
              showList={showList}
              setSelected={setSelected}
            />
          </div>
        </section>

        <button className={styles.btn} type="submit">
          Save
        </button>
      </form>
    </Dialog>
  );
};

export default CustomDialog;
