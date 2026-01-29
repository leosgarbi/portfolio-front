'use client';

import { useState } from 'react';

const videos = [
  {
    title: 'Vídeoclipe - Léo Fressato',
    category: 'Vídeoclipe',
    duration: '3:45',
    thumbnail: '/cinematic-wedding-video.jpg',
    awards: 2,
    embedUrl: 'https://www.youtube.com/embed/sAXEfvMqwEI?si=TuNU_NofbTSQaMYf',
  },
  {
    title: 'Documentario - Sefras',
    category: 'Documentary',
    duration: '1:30',
    thumbnail: '/fashion-commercial-video.jpg',
    awards: 1,
    embedUrl: 'https://www.youtube.com/embed/A3zhNtp_o3E?si=ILPWjNFMnP4j24i3',
  },
  {
    title: 'Documentário - Noites da Augusta',
    category: 'Documentary',
    duration: '5:20',
    thumbnail: '/travel-documentary-video.jpg',
    awards: 3,
    embedUrl: 'https://www.youtube.com/embed/fkHgy27F9yY?si=y-_ptap4RZOuvyiN',
  },
];

export function VideoShowcase() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <section className='relative mb-20 px-4 py-20'>
      <div className='mx-auto max-w-7xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 mb-4 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          VIDEOGRAFIA
        </h2>
        <p className='mb-16 text-muted-foreground text-lg text-center'>
          Narrativas visuais em movimento
        </p>

        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {videos.map((video, i) => (
            <div
              key={i}
              className='group relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 glass-effect'
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Video Player or Thumbnail */}
              <div className='relative bg-black w-full aspect-video'>
                <iframe
                  className='w-full h-full'
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              </div>

              {/* Info */}
              <div className='p-6'>
                <span className='font-semibold text-primary text-xs uppercase tracking-wider'>
                  {video.category}
                </span>
                <h3 className='mt-2 mb-4 font-bold group-hover:text-primary text-xl transition-colors'>
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
