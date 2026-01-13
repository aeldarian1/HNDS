"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import galleryData from "@/data/gallery.json";
import { RevealOnScroll, ScaleOnHover } from "@/app/components/InteractiveElements";
import { FadeIn, HeroFadeIn, StaggerContainer, StaggerItem } from "@/app/components/AnimatedSection";

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Get unique years
  const years = Array.from(new Set(galleryData.map(item => item.year))).sort((a, b) => b - a);

  // Filter by year
  const filteredItems = selectedYear === "all"
    ? galleryData
    : galleryData.filter(item => item.year.toString() === selectedYear);

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <ImageIcon className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-6xl md:text-7xl font-light text-white">Galerija</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Ovdje možete pregledati fotografije s naših događanja, stručnih skupova i okupljanja. Zabilježeni trenuci prikazuju aktivnosti i atmosferu naših susreta.
            </p>
            <div className="flex items-center gap-6 text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-white">{galleryData.length}</span>
                <span>galerija</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span>{years.length} godina arhive</span>
              </div>
            </div>
          </HeroFadeIn>
        </div>
      </section>

      {/* Year Filters */}
      <section className="py-12 md:py-16 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedYear("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedYear === "all"
                  ? "bg-yellow-600 text-white"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
            >
              Sve ({galleryData.length})
            </button>
            {years.map(year => {
              const count = galleryData.filter(item => item.year === year).length;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year.toString())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedYear === year.toString()
                      ? "bg-yellow-600 text-white"
                      : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                  }`}
                >
                  {year} ({count})
                </button>
              );
            })}
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nema galerija za odabrano razdoblje.</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <StaggerItem key={item.id}>
                  <Link href={`/gallery/${item.slug}`}>
                    <ScaleOnHover scale={1.02}>
                      <div className="group cursor-pointer h-full">
                        <div className="bg-slate-900 border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 overflow-hidden h-full flex flex-col hover:shadow-lg hover:shadow-yellow-600/10">
                          {/* Image */}
                          <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
                            {item.localImage ? (
                              <Image
                                src={item.localImage}
                                alt={item.title}
                                fill
                                priority={index < 3}
                                quality={100}
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <motion.div
                                className="text-gray-500"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <ImageIcon className="w-16 h-16" />
                              </motion.div>
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-yellow-600/0 group-hover:bg-yellow-600/10 transition-colors duration-300" />
                          </div>
                          
                          {/* Info */}
                          <div className="p-6 space-y-3 flex-grow flex flex-col">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-4 h-4 text-yellow-600" />
                              <span>{item.formattedDate}</span>
                            </div>
                            
                            <h3
                              className="text-xl font-medium text-white group-hover:text-yellow-400 transition-colors line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                            
                            <div className="text-yellow-500 text-sm font-semibold flex items-center gap-2 mt-auto">
                              Pogledaj galeriju
                              <motion.span 
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScaleOnHover>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
