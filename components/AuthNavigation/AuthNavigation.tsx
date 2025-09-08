'use client';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import TagsMenu from '../TagsMenu/TagsMenu';
import Link from 'next/link';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { ImExit } from 'react-icons/im';
import { AiOutlineUser } from 'react-icons/ai';

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };
  return (
    <>
      {isAuthenticated ? (
        <div className={css.containerAuth}>
          <TagsMenu />
          <ul>
            <li className={css.navigationItem}>
              <Link
                href="/profile"
                prefetch={false}
                className={css.navigationLink}
              >
                <AiOutlineUser className={css.linkUser} />
              </Link>
            </li>
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.email}</p>
              <button
                className={css.logoutButton}
                type="button"
                onClick={handleClickLogOut}
              >
                <ImExit className={css.logoutButtonIcon} />
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className={css.containerNoAuth}>
          <ul>
            <li className={css.navigationItem}>
              <Link
                className={`${css.navigationLink} ${css.linkBorderLogin}`}
                prefetch={false}
                href="/sign-in"
              >
                Login
              </Link>
            </li>
            <li className={`${css.navigationLink} ${css.linkBorderRegister}`}>
              <Link
                href="/sign-up"
                prefetch={false}
                className={css.navigationLink}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AuthNavigation;
