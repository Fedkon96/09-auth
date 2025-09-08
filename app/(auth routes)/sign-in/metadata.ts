import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Note Hub',
  description: 'Sign in to your account to access your notes.',
  openGraph: {
    title: 'Login | Note Hub',
    description: 'Sign in to your account to access your notes.',
    url: '/sign-in',
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
