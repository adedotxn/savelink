import styles from "@styles/dashboard.module.css";
import { getServerSession } from "next-auth";
import getQueryClient from "src/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import List from "@components/shared/lists";
import Dialog from "@components/board/dialog";
import { redirect } from "next/navigation";
import { authOptions } from "src/lib/authOptions";

async function getUserData() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const user = session?.user?.email;

  const res = await fetch(`${process.env.URL}/api/${user}`, {
    next: { tags: ["all_links"] },
  });

  const data = await res.json();

  let categories = [];

  for (let i: number = 0; i < data.data.length; ++i) {
    const _data = data.data[i]?.category;

    if (_data !== undefined) categories.push("");

    data.data[i].categories.forEach((data: string) => {
      categories.push(data);
    });
  }

  categories = [...new Set(categories)];

  return { name: user, data: data.data, categories };
}

const Dashboard = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUserData);
  const dehydratedState = dehydrate(queryClient);
  const data = await getUserData();

  if (!data.name || data.name === undefined) {
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <List name={data.name} savedlinks={data.data} />
        </section>
      </main>

      <footer className={styles.footer}>
        <Dialog name={data.name} categories={data.categories} />
      </footer>
    </div>
  );
};
export default Dashboard;
