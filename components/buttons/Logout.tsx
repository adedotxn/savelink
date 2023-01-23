import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/helpers/context";

const Logout = () => {
  const router = useRouter();
  const { theme, switchTheme } = useTheme();

  const handleSignOut = async (e: { preventDefault: () => void }) => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    e.preventDefault();
    router.push(data.url);
    // router.replace('/')
  };
  return (
    <button>
      <a onClick={handleSignOut}>
        <ExitIcon width={20} height={20} color={theme ? "white" : "black"} />
      </a>
    </button>
  );
};

export default Logout;
