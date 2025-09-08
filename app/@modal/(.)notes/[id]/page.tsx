import { fetchNoteId } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detail',
  description: 'Detail page',
  openGraph: {
    title: 'Detail',
    description: 'Detail page',
    url: 'https://09-auth-rosy-delta.vercel.app/@modal/(.)notes/[id]',
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

interface PreviewProps {
  params: Promise<{ id: string }>;
}

const PreviewPage = async ({ params }: PreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default PreviewPage;
