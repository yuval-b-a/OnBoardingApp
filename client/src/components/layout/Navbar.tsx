import { Link } from "react-router-dom";
import teaIcon from "../../assets/tea-icon.png";
import styles from './Navbar.module.scss';
import { LogoutButton } from "../general/LogoutButton";

export function Navbar() {  
    return (
      <nav className={styles.nav}>
        <img src={teaIcon} width={50} />
        <ul className={styles.ul}>
            <li className={styles.li}>
                <Link to="/">Home</Link>
            </li>
            <li className={styles.li}>
                <Link to="/about">About Us</Link>
            </li>
            <li className={styles.li}>
                <Link to="/products">Our Products</Link>
            </li>
            <li className={styles.li}>
                <LogoutButton />
            </li>
        </ul>
      </nav>
    );
  }