'use client';

import React, { useState, use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import galleryData from '@/data/gallery.json';

export default function GalleryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const gallery = galleryData.find((g) => g.slug === resolvedParams.slug);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!gallery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Galerija nije pronađena</h1>
          <Link
            href="/gallery"
            className="text-yellow-500 hover:text-yellow-400 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Natrag na galerije
          </Link>
        </div>
      </div>
    );
  }

  const allImages = gallery.images && gallery.images.length > 0 
    ? gallery.images 
    : gallery.localImage 
    ? [{ id: gallery.id, url: gallery.localImage, thumbnail: gallery.localImage, ext: '.jpg', type: 'image' as const }] 
    : [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Natrag na galerije
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{gallery.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{gallery.formattedDate}</span>
              </div>
              <span>•</span>
              <span>{allImages.length} fotografija</span>
            </div>
          </motion.div>

          {/* Image Grid */}
          {allImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  {(image as any)?.type === 'video' || (image as any)?.mimeType?.startsWith('video/') ? (
                    <video
                      src={`/images/gallery/${gallery.id}/${image.id}${image.ext || '.mp4'}`}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={`/images/gallery/${gallery.id}/${image.id}${image.ext || '.jpg'}`}
                      alt={`${gallery.title} - Fotografija ${index + 1}`}
                      fill
                      priority={index < 4}
                      quality={100}
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {((image as any)?.type === 'video' || (image as any)?.mimeType?.startsWith('video/')) && (
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nema dostupnih fotografija</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-yellow-500 text-2xl font-bold z-10"
          >
            ✕
          </button>

          {/* Navigation Arrows */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
              className="absolute left-4 text-white hover:text-yellow-500 text-4xl font-bold z-10"
            >
              ‹
            </button>
          )}
          {selectedImage < allImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
              className="absolute right-4 text-white hover:text-yellow-500 text-4xl font-bold z-10"
            >
              ›
            </button>
          )}

          {/* Media */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {(allImages[selectedImage] as any)?.type === 'video' || (allImages[selectedImage] as any)?.mimeType?.startsWith('video/') ? (
              <video
                src={`/images/gallery/${gallery.id}/${allImages[selectedImage].id}${allImages[selectedImage].ext || '.mp4'}`}
                className="max-w-full max-h-[90vh] mx-auto"
                controls
                autoPlay
              />
            ) : (
              <Image
                src={`/images/gallery/${gallery.id}/${allImages[selectedImage].id}${allImages[selectedImage].ext || '.jpg'}`}
                alt={`${gallery.title} - Fotografija ${selectedImage + 1}`}
                fill
                priority
                quality={100}
                className="object-contain"
                sizes="100vw"
              />
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {selectedImage + 1} / {allImages.length}
          </div>
        </motion.div>
      )}
    </>
  );
}
