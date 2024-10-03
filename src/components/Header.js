import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.siteTitle}><Link href="index22">サイトタイトル</Link></div>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
          <li>
            <Link href="#works">Works</Link>
          </li>
          <li>
            <Link href="#portfolio">Portfolio</Link>
          </li>
          <li>
            <Link href="about">about</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 50px',
    width: '100%',
    position: 'fixed',
    boxSizing: 'border-box',
    zindex: '1000',
  },
  siteTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navList: {
    display: 'flex',
    gap: '20px',
    listStyle: 'none',
    fontWeight:'bold',
  },
};

export default Header;