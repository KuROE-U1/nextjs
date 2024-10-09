import Link from 'next/link';
import './header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="siteTitle">
                <Link href="/">M.H</Link>
            </div>
            <nav>
                <ul className="navList">
                    <li>
                        <Link href="works">Works</Link>
                    </li>
                    <li>
                        <Link href="about">About</Link>
                    </li>
                    <li>
                        <Link href="contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <div class="hamburger hamburger--collapse">
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;