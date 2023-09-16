"use client";

import styles from "@styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CabinetGrotesk } from "@utils/font";
import Image from "next/image";

const SignIn = () => {
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
    <>
      <header className={styles.header}>📌</header>
      <div className={styles.container}>
        <main className={`${styles.main} ${CabinetGrotesk.className}`}>
          <h1> Savelink. </h1>
          <p>
            Save web links from anywhere and organize into categories with
            <strong> savelink</strong>, the easiest link manager to keep all
            your favorite links in one place.
          </p>

          <div>
            <button onClick={handleSignIn} className={CabinetGrotesk.className}>
              {" "}
              <Image
                src="/assets/google.svg"
                width={25}
                height={25}
                alt="google logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              Sign in with Google{" "}
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignIn;
