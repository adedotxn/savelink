import styles from "@styles/dashboard.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]";
import List from "@components/lists";
import getQueryClient from "src/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";

async function getUserData() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(`http://localhost:3000/api/${user}`);
  const data = await res.json();
  return { name: user, data };
}

const Dashboard = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUserData);
  const dehydratedState = dehydrate(queryClient);
  console.log("dehydratedState", dehydratedState);
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
    </div>
  );
};
export default Dashboard;
