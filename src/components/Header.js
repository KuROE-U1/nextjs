import Link from 'next/link';
import './header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="siteTitle">
                <Link href="/">KuROEu1</Link>
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
        </header>
    );
};

export default Header;