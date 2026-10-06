"use client"

import Image from 'next/image';
import { useState } from 'react';
import Masonry from 'react-masonry-css'

const samplePayload = [
  "1920x1081-px-1967-mustang-fastback-car-drive-neon-retrowave-synthwave-vehicle-art-skyline-hd-art-wallpaper-105c0a064a0622456552ef3335f6197c.jpg",
  "320x200.png",
  "4131870.jpg",
  "5ecea6c03f5cbb358d27d3e1_maxime-caron-9_hRmtjD8O4-unsplash.jpg",
  "cyberpunk-2077-girl-car-mantis-blade-uhdpaper.com-4K-8.676.jpg",
  "cyberpunk-2077-girl-glasses-uhdpaper.com-4K-3.1971.jpg",
  "cyberpunk-night-city-4k-wallpaper-uhdpaper.com-82@0@h.jpg",
  "digital-art-photoshop-concept-art-futuristic-wallpaper-a444d21f487cf81ee9ce690a63e234d3.jpg",
  "digital-digital-art-artwork-night-city-hd-wallpaper-db165cade371bf79d5f46b69adec8c20.jpg",
  "dj-cyber-neon-boy-4k-6m.jpg",
  "eddie-mendoza-street-justice-1.jpg",
  "OIP(3).jpg",
  "sci-fi-assassin-gas-mask-ai-art-4k-wallpaper-uhdpaper.com-20@0@i.jpg",
];
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
type GalleryProps = {
  imgs: string[];
};

const Gallery = ({ imgs }: GalleryProps) => {
  const [images] = useState<string[]>(imgs.length > 0 ? imgs : samplePayload);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex m-auto -ml-2"
      columnClassName="bg-clip-padding p-0"
    >
      {images.map((item) => (
        <div className="" key={item}>
          <div className="p-0 m-2 rounded-lg border group hover:scale-105 overflow-hidden transition-all duration-700">
            <Image
              key={item}
              src={`/images/${item}`}
              alt={item}
              width={1080}
              height={720}
              className="w-full h-auto object-cover scale-110 group-hover:scale-100 duration-700"
            />
          </div>
        </div>
      ))}
    </Masonry>
  )
}

export default Gallery