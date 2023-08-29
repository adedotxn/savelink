import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@styles/categories.module.css";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/router";

async function getCategories() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(`http://localhost:3000/api/${user}/categories`);
  const data = await res.json();
  console.log("data", data);
  return { name: user, data };
}

const Categories = async () => {
  const data = await getCategories();

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
      <div className={styles.categories}>
        {data.data?.map((data: string, index: number) => (
          <Link key={index} href={`/category/${data}`}>
            <div className={styles.category_cards}>
              <h1>{data}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
