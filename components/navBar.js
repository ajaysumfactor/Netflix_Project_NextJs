import styles from './navBar.module.css'
import { useRouter } from "next/router";
import Link from "next/link";
const NavBar = (props) => {
    const { username } = props;
    const router = useRouter();
    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };
    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink}></a>
                <div className={styles.logoWrapper}>
                    Netflix
                </div>

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn}>
                            <p className={styles.username}>{username}</p>
                            {/* Expand more icons */}
                        </button>
                        <div className={styles.navDropdown}>
                            <div>
                                <Link href="/login" className={styles.linkName}>
                                    Sign out
                                </Link>
                                <div className={styles.lineWrapper}></div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
export default NavBar;