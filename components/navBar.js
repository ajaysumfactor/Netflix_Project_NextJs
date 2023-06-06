import styles from './navBar.module.css'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { magic } from "../lib/magic-client.js";

const NavBar = () => {
    // const { username } = props;
    const [username, setUserName] = useState('');
    const [didToken, setDidToken] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    useEffect(() => {
        async function getUserName() {
            try {
                const { email, publicAddress } = await magic.user.getMetadata();
                const didToken = await magic.user.getIdToken();
                console.log({didToken});
                if (email) {
                    setUserName(email);
                    setDidToken(didToken);
                }
            } catch (error) {
                console.error("metadata magic email error: ", error);
            }
        }
        getUserName();
    }, []);

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };
    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };
    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/logout", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-Type": "application/json",
              },
            });
      
            const res = await response.json();
          } catch (error) {
            console.error("Error logging out", error);
            router.push("/login");
          }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoLink} href="/">
                    
                    {/* <div className={styles.logoWrapper}>
                    Netflix
                </div> */}
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/static/icons/netflix.svg"
                            alt="Netflix logo"
                            width="128"
                            height="34"
                        />
                    </div>
                    
                </Link>

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            {/* Expand more icons */}
                            <Image
                                src="/static/icons/expandMore.svg"
                                alt="Expand more"
                                width="24"
                                height="24"
                                color="white"
                            />
                        </button>
                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <Link href="/login" className={styles.linkName} onClick={handleSignOut}>
                                        Sign out
                                    </Link>
                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
export default NavBar;