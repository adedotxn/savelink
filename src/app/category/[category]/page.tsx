import styles from "@styles/dashboard.module.css";
import { getServerSession } from "next-auth/next";
import List from "@components/shared/lists";
import Loader from "@components/ui/loader";
import { authOptions } from "src/lib/authOptions";

async function getCategory(category: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(
    `${process.env.URL}/api/${user}/category/${category}`
  );
  const data = await res.json();
  return { name: user, data };
}

const Category = async ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const data = await getCategory(category);

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

export default Category;
