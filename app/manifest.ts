import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hrvatsko-njemačko društvo Split',
    short_name: 'HNDS',
    description: 'Službena web stranica Hrvatsko-njemačkog društva Split - više od 30 godina promicanja hrvatsko-njemačkih kulturnih veza',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#ca8a04',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
