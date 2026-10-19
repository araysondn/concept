import React from 'react';
import type { ProductImage } from '../../data/productImages';

/** Product picture panel: cut-outs sit on a soft CIC tint (CIC Online style); photos fill the frame. */
export function ProductArt({ image, className = 'h-[170px]' }: {image: ProductImage;className?: string;}) {
  return image.cutout ?
  <span className={`relative block overflow-hidden bg-gradient-to-br from-[#FBECEC] via-[#FDF2F4] to-[#FFF4D6] ${className}`} aria-hidden="true">
      <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/60" />
      <img src={image.src} alt="" loading="lazy" className={`relative h-full w-full object-contain object-bottom p-3 pb-0 transition-transform duration-300 group-hover:scale-105 ${image.blend ? 'mix-blend-multiply' : ''}`} />
    </span> :

  <span className={`block overflow-hidden bg-cic-mist ${className}`} aria-hidden="true">
      <img
      src={image.src}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      style={image.position ? { objectPosition: image.position } : undefined} />

    </span>;

}
