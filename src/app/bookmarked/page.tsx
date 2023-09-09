import { getServerSession } from "next-auth/next";
import styles from "@styles/dashboard.module.css";
import List from "@components/shared/lists";
import Loader from "@components/ui/loader";
import { authOptions } from "src/lib/authOptions";

async function getBookmarks() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(`${process.env.URL}/api/${user}/bookmarks`, {
    next: { tags: ["all_links", "bookmarked"] },
  });
  const data = await res.json();
  return { name: user, data: data };
}

const Bookmark = async () => {
  const data = await getBookmarks();

  if (!data.name || data.name === undefined) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <List name={data.name} savedlinks={data.data} />
        </section>
      </main>
    </div>
  );
};

export default Bookmark;
