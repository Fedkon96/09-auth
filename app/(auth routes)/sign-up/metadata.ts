import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Note Hub',
  description: 'Register to your account to access your notes.',
  openGraph: {
    title: 'Register | Note Hub',
    description: 'Register to your account to access your notes.',
    url: 'https://09-auth-rosy-delta.vercel.app/sign-in',
    siteName: 'Note Hub',
    type: 'website',
    images: [
      {
        url: '/images/note.jpg',
        width: 1200,
        height: 630,
        alt: 'An application for note-taking and organization',
      },
    ],
  },
};
