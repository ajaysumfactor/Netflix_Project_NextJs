import styles from '../styles/Login.module.css'
import Image from 'next/image';
import Head from "next/head";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';


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
    const handleLoginWithEmail = (e) => {
        // console.log("Say hii! button");
        e.preventDefault();
        if (email) {
            if(email==='ajayverma041999@gmail.com'){
            //    console.log("user logged in ")
               router.push("/");

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