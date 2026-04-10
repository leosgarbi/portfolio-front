import { Gallery } from "@/types";

export const galleries: Gallery[] = [
  {
    id: 'portrait',
    title: 'Retratos',
    description: 'Capturando a essência humana',
    images: [
      {
        id: 'portrait-1',
        src: 'https://r2.leosgarbi.com.br/554992608_25032804689682255_9177703638228419998_n.jpg',
        alt: 'Retrato feminino em luz natural',
      },
      {
        id: 'portrait-2',
        src: 'https://r2.leosgarbi.com.br/catedral_cwb.jpg',
        alt: 'Retrato masculino em estúdio',
      },
      {
        id: 'portrait-3',
        src: 'https://r2.leosgarbi.com.br/portrait_ar.jpg',
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
        src: 'https://r2.leosgarbi.com.br/raining_cwb.jpg',
        alt: 'Montanhas ao pôr do sol',
      },
      {
        id: 'landscape-2',
        src: 'https://r2.leosgarbi.com.br/sun_portrait.jpg',
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