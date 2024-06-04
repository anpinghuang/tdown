// components/Navbar.js

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navbar.module.css'; // Adjust the path based on your project structure

import logo from '../public/swiftdownloader.png';

const Navbar = () => {
  return (
    <nav className={styles['navbar-nav']}>
      <div className={styles.logo}>
        {/* Replace 'logo.png' with the path to your logo image */}
        
        <Link href="/"><Image className={styles.navLogo} src={logo} alt="Logo" sizes="100%"/></Link>
      </div>

      {/* <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/">
            About
          </Link>
        </li>
        
      </ul> */}
    </nav>
  );
};

export default Navbar;
