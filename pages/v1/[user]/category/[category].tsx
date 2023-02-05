import styles from "../../../../styles/dashboard.module.css";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCategories, useDataGetter } from "../../../../utils/api/api";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import List from "../../../../components/lists";

const Category = () => {
  const router = useRouter();
  const { user, category } = router.query;
  // console.log("user", user)
  // console.log('user/category', category)

  const { data: session, status } = useSession();
  const name: string = session?.user?.email!;

  const { isLoading, error, data } = useQuery(
    ["perCategory", user, category],
    () => getCategories(user, category)
  );

  if (isLoading)
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  if (!isLoading) {
    const array = data?.data;
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <section>
            <List array={array} />
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          padding: ".5rem 1rem",
          background: "var(--accent-color)",
          color: "var(--text-color)",
          borderRadius: ".3rem",
        }}
      >
        <p>
          An error seems to have occured, please make sure you&apos;re serching
          through a correct category and refresh
        </p>
      </div>
    );
  }
};

export default Category;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("perCategory", () => session?.user?.email!);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
