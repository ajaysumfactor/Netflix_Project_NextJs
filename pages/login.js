import styles from '../styles/Login.module.css'
import Image from 'next/image';
import Head from "next/head";
import Link from 'next/link';
const Login = () => {
    const handleLoginWithEmail=(e)=>{
        console.log("Say hii! button");
        e.preventDefault();
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
             <input type="text" placeholder='Email Address' className={styles.emailInput}/>
             <p className={styles.userMsg}></p>
             <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign In</button>
             </div>
        </main>




       
    </div>
}

export default Login;