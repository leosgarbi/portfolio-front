export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type Gallery = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
};
