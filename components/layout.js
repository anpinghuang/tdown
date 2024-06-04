import styles from './layout.module.css';

import utilStyles from '../styles/utils.module.css';

export const siteTitle = 'Keyword Finder';




export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>;
  }