import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styles from "@styles/categories.module.css";
import { listCategories, useDataGetter, userLinks } from "@utils/api";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/router";

const Categories = () => {
  const { replace } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      replace("/signin");
    },
  });
  const name: string = session?.user?.email!;

  async function getCategories(name: string): Promise<string[]> {
    const data = await listCategories(name);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(name),
  });

  if (isLoading) {
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.categories}>
          {data?.map((data, index) => (
            <Link key={index} href={`/category/${data}`}>
              <div className={styles.category_cards}>
                <h1>{data}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Categories;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("links", () =>
    userLinks(session?.user?.email!)
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
