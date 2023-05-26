import '@/styles/globals.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

export default function App({ Component, pageProps }) {
  const router = useRouter();
 const [isLoading,setIsLoading]=useState(true);
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
  useEffect(() => {
    async function loginDelay(){
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
}
loginDelay();
  }, [router]);

  return isLoading ? <div>Loading...</div> : <Component {...pageProps} />
}
