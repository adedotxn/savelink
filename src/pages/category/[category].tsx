import styles from "@styles/dashboard.module.css";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCategories } from "@utils/api";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import List from "@components/lists";
import { authOptions } from "@api/auth/[...nextauth]";

const Category = () => {
  const router = useRouter();
  const user = router.query.user as string;
  const category = router.query.category as string;

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
            <List name={name} savedlinks={array} />
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
  const session = await getServerSession(context.req, context.res, authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("perCategory", () => session?.user?.email!);

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
