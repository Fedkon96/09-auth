'use client';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import TagsMenu from '../TagsMenu/TagsMenu';
import Link from 'next/link';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

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
        <>
          <li>
            <TagsMenu />
          </li>
          <li className={css.home}>
            <Link href={'/profile'}>Profile</Link>
          </li>
          <li>
            <p>{user?.email}</p>
            <button type="button" onClick={handleClickLogOut}>
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.home}>
            <Link href="/sign-in">Sign-In</Link>
          </li>
          <li className={css.home}>
            <Link href="/sign-up">Sign-Up</Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
