'use client';

import { Button } from '@/components/ui/button';
import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

/* =========================
 * Tipagens
 * ========================= */
type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type Gallery = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

const galleries: Gallery[] = [
  {
    id: 'portrait',
    title: 'Retratos',
    description: 'Capturando a essência humana',
    images: [
      {
        id: 'portrait-1',
        src: 'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/554992608_25032804689682255_9177703638228419998_n.jpg',
        alt: 'Retrato feminino em luz natural',
      },
      {
        id: 'portrait-2',
        src: 'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/catedral_cwb.jpg',
        alt: 'Retrato masculino em estúdio',
      },
      {
        id: 'portrait-3',
        src: 'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/portrait_ar.jpg',
        alt: 'Retrato em preto e branco',
      },
    ],
  },
  {
    id: 'landscape',
    title: 'Paisagens',
    description: 'A beleza natural em pixels',
    images: [
      {
        id: 'landscape-1',
        src: 'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/raining_cwb.jpg',
        alt: 'Montanhas ao pôr do sol',
      },
      {
        id: 'landscape-2',
        src: 'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/sun_portrait.jpg',
        alt: 'Lago com reflexo',
      },
    ],
  },
  {
    id: 'urban',
    title: 'Urbano',
    description: 'A vida nas cidades',
    images: [
      {
        id: 'urban-1',
        src: 'https://placehold.co/600x400?text=Urban+1',
        alt: 'Rua movimentada à noite',
      },
      {
        id: 'urban-2',
        src: 'https://placehold.co/600x400?text=Urban+2',
        alt: 'Arquitetura moderna',
      },
    ],
  },
];

export function GalleryGrid() {
  const [activeGallery, setActiveGallery] = useState<string>('portrait');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const currentGallery = galleries.find(
    (gallery) => gallery.id === activeGallery,
  );

  if (!currentGallery) return null;

  return (
    <section className='relative px-4 py-20'>
      <div className='mx-auto max-w-7xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-primary to-secondary mb-4 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          GALERIAS
        </h2>

        <p className='mb-12 text-muted-foreground text-lg text-center'>
          Explore diferentes universos visuais
        </p>

        {/* Tabs */}
        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          {galleries.map((gallery) => (
            <Button
              key={gallery.id}
              size='lg'
              onClick={() => setActiveGallery(gallery.id)}
              className={`group relative overflow-hidden ${
                activeGallery === gallery.id
                  ? `bg-linear-to-r from-primary to-secondary text-white`
                  : 'glass-effect hover:bg-primary/10'
              }`}
            >
              <span className='z-10 relative'>{gallery.title}</span>

              {activeGallery === gallery.id && (
                <span className='absolute inset-0 bg-linear-to-r opacity-20 group-hover:opacity-30 transition-opacity' />
              )}
            </Button>
          ))}
        </div>

        {/* Descrição */}
        <div className='mb-12 text-center'>
          <h3 className='mb-2 font-bold text-3xl'>{currentGallery.title}</h3>
          <p className='text-muted-foreground text-lg'>
            {currentGallery.description}
          </p>
        </div>

        {/* Grid de imagens */}
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {currentGallery.images.map((image, index) => (
            <div
              key={image.id}
              className='group relative rounded-2xl aspect-4/3 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer glass-effect'
              onClick={() => setSelectedImage(image.src)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-500'
              />

              <div className='absolute inset-0 flex justify-center items-end bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 pb-6 transition-opacity duration-300'>
                <ZoomIn className='w-8 h-8 text-white' />
              </div>

              <div
                className={`absolute inset-0 bg-linear-to-br from-black to-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className='z-50 fixed inset-0 flex justify-center items-center bg-black/95 p-4 animate-in fade-in'
          onClick={() => setSelectedImage(null)}
        >
          <button
            className='top-4 right-4 absolute flex justify-center items-center hover:bg-white/20 rounded-full w-12 h-12 transition-colors glass-effect'
            aria-label='Fechar'
            onClick={() => setSelectedImage(null)}
          >
            <X className='w-6 h-6 text-white' />
          </button>

          <div className='relative w-full max-w-6xl h-full max-h-[90vh]'>
            <Image
              src={selectedImage}
              alt='Imagem selecionada'
              fill
              className='object-contain'
            />
          </div>
        </div>
      )}
    </section>
  );
}
