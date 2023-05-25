import styles from '../styles/Login.module.css'
import Image from 'next/image';
import Head from "next/head";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {magic} from "../lib/magic-client.js";



const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [userMsg, setUserMsg] = useState("");

    const handleOnChangeEmail = (e) => {
        //    console.log("event",e);
        setUserMsg("");
        const email = e.target.value;
        setEmail(email);
    }
    const handleLoginWithEmail = async(e) => {
        console.log("Say hii! button");
        e.preventDefault();
        if (email) {
            if(email==='ajayverma.sumfactor@gmail.com'){
            //    console.log("user logged in ")
            //    router.push("/");
            try {
                const DIDToken = await magic.auth.loginWithMagicLink({
                    email,
                 });
                 console.log(DIDToken);
              } catch(error) {
                console.log("DIDTOKEN Error",error);
               }

            }
            else{
                setUserMsg("something went wrong!");
            }

        }
        else {
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

                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign In</button>
            </div>
        </main>





    </div>
}

export default Login;