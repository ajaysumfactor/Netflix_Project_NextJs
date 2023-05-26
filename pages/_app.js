import '@/styles/globals.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
         router.push("/");
      } else {
         router.push("/login");
      }
    };
    handleLoggedIn();
  }, []);
  return <Component {...pageProps} />
}
