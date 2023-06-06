import styles from '../styles/Login.module.css'
import Image from 'next/image';
import Head from "next/head";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { magic } from "../lib/magic-client.js";



const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [userMsg, setUserMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function loginDelay() {
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

    const handleOnChangeEmail = (e) => {
         setUserMsg("");
        const email = e.target.value;
        setEmail(email);
    }
    const handleLoginWithEmail = async (e) => {
         e.preventDefault();
        setIsLoading(true);
        if (email) {

           
            try {
                const DIDToken = await magic.auth.loginWithMagicLink({
                    email,
                });
                 if (DIDToken) {//render to home page if DIDToken is successfully generated 
                    // setIsLoading(false);
                    const response = await fetch("/api/login", {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${DIDToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const loggedInResponse = await response.json();
                    if (loggedInResponse.done) {
                         router.push("/");

                    }
                    else {
                        setIsLoading(false);
                        setUserMsg("something went wrong logging in ")
                    }
                    // router.push("/");
                }
            } catch (error) {
                setIsLoading(false);
                console.log("DIDTOKEN Error", error);
            }




        }
        else {
            setIsLoading(false);
            setUserMsg("Enter a valid email address");
            // console.log("Please enter the email correct ")
        }
    }
    return <div className={styles.container}>
        <Head>
            <title>Netflix SignIn</title>
        </Head>
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <Link className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/static/icons/netflix.svg"
                            alt="Netflix logo"
                            width="128"
                            height="34"
                        />
                    </div>
                </Link>
            </div>
        </header>


        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In </h1>

                <input type="text" placeholder='Email Address' className={styles.emailInput}
                    onChange={handleOnChangeEmail} />

                <p className={styles.userMsg}>{userMsg}</p>

                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading ? "Loading..." : 'Sign In'}</button>
            </div>
        </main>





    </div>
}

export default Login;