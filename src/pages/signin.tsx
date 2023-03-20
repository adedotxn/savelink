import type { NextPage } from "next";

import styles from "@styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = (): JSX.Element => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/board`);
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="loading_container">
        <h2 className={styles.loading}>📌</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.shimmer}>Savelink</h1>

        <p>
          Save and categorise your important links from all across the web in
          one place.
        </p>

        <div>
          <button onClick={handleSignIn}> Sign in with google </button>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
