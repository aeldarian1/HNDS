'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/app/components/ui/Animations';

interface LightboxImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryLightboxProps {
  images: LightboxImage[];
  className?: string;
}

export function GalleryLightbox({ images, className }: GalleryLightboxProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <StaggerContainer className={className || "grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4"}>
        {images.map((image) => (
          <StaggerItem key={image.id}>
            <motion.button
              onClick={() => setLightboxImage(image.src)}
              className="group relative aspect-square overflow-hidden rounded-lg active:scale-[0.98] transition-transform"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Gallery image"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GalleryLightbox;
