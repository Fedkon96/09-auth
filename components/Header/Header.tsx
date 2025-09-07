import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.active} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.link}>
              Home
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
