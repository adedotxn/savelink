import styles from "@styles/dashboard.module.css";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getCategories } from "@utils/api";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import List from "@components/lists";
import { authOptions } from "@api/auth/[...nextauth]";

async function getCategory(category: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(
    `http://localhost:3000/api/${user}/category/${category}`
  );
  const data = await res.json();
  console.log("data", data);
  return { name: user, data };
}

const Category = async ({ params }: { params: { category: string } }) => {
  // const router = useRouter();
  const { category } = params;
  console.log({ category });
  const data = await getCategory(category);
  // const { data: session, status } = useSession();
  // const name: string = session?.user?.email!;
  // const user: string = session?.user?.email!;

  // const { isLoading, error, data } = useQuery(
  //   ["perCategory", user, category],
  //   () => getCategories(user, category)
  // );

  // if (isLoading)
  //   return (
  //     <div className="loading_container">
  //       <div className="lds_ripple">
  //         <div></div>
  //         <div></div>
  //       </div>
  //     </div>
  //   );

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

export default Category;
