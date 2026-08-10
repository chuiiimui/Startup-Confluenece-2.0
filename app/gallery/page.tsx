import type { Metadata } from 'next';
import GalleryPage from '@/views/GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and moments from Startup Confluence.',
};

export default function Page() {
  return <GalleryPage />;
}
