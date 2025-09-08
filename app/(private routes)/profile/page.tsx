import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { sHasSession, getMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';
import { AiOutlineSetting } from 'react-icons/ai';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your NoteHub profile page',
  openGraph: {
    title: 'Profile',
    description: 'Your NoteHub profile page',
    url: 'https://09-auth-black.vercel.app/profile',
    images: [
      {
        url: '/images/note.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile',
      },
    ],
  },
};

export default async function ProfilePage() {
  const ok = await sHasSession();
  if (!ok) redirect('/sign-in');

  const user = await getMe();

  const username = user.username || user.email.split('@')[0];

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            <AiOutlineSetting className={css.editProfileIcon} />
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src="/images/avatar.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
