import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery } from '../data/gallery';
import type { GalleryImage } from '../types';
import SectionHeading from '../components/SectionHeading';
import ImageReveal from '../components/ImageReveal';
import DepthFrame from '../components/interactive3d/DepthFrame';
import { usePerfMode } from '../hooks/usePerfMode';
import { FiX, FiZoomIn } from 'react-icons/fi';

const Gallery = () => {
  const { isMobile, isAndroid, isLowEnd, reduceMotion } = usePerfMode();
  const lite = isMobile || isAndroid || isLowEnd || reduceMotion;
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialCount = lite ? 6 : 9;
  const displayedImages = useMemo(
    () => (showAll ? gallery : gallery.slice(0, initialCount)),
    [showAll, initialCount]
  );

  const lightboxSrc = (image: GalleryImage) =>
    lite ? image.preview || image.thumb : image.src;

  return (
    <section id="gallery" className="relative overflow-hidden py-24">
      {!lite && (
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-1/2 -translate-x-1/4 translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
      )}

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Gallery"
          title="Previous Event Gallery"
          alignment="center"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {displayedImages.map((image) => (
            <div
              key={image.id}
              className="relative"
              style={
                lite
                  ? {
                      contentVisibility: 'auto',
                      containIntrinsicSize: '400px 300px',
                    }
                  : undefined
              }
            >
              <DepthFrame
                className="clay-card clay-card--media group cursor-pointer overflow-hidden rounded-2xl"
                data-cursor="image"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageReveal
                    src={image.thumb || image.src}
                    alt={image.alt || image.title}
                    className="absolute inset-0 h-full w-full"
                    imgClassName={
                      lite
                        ? ''
                        : 'transition-transform duration-700 ease-out group-hover:scale-110'
                    }
                    lite={lite}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {!lite && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(180deg, color-mix(in srgb, var(--brand-sky) 25%, transparent), color-mix(in srgb, var(--brand-orange) 35%, transparent))',
                      }}
                    >
                      <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/30 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                        <FiZoomIn size={24} />
                      </div>
                    </div>
                  )}
                </div>
              </DepthFrame>
            </div>
          ))}
        </div>

        {gallery.length > initialCount && (
          <div className="mt-10 text-center sm:mt-16">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="clay-pill rounded-full px-8 py-3 font-medium transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {showAll ? 'Show Less' : 'View All Images'}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={lite ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={lite ? undefined : { opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 ${
              lite ? '' : 'backdrop-blur-xl'
            }`}
            style={{ backgroundColor: lite ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.8)' }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="clay-chip absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full sm:right-6 sm:top-6 sm:h-12 sm:w-12"
              style={{ color: 'var(--text-primary)' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close gallery image"
            >
              <FiX size={24} />
            </button>

            <motion.div
              initial={lite ? false : { scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={lite ? undefined : { scale: 0.9, opacity: 0, y: 20 }}
              transition={
                lite
                  ? { duration: 0.15 }
                  : { type: 'spring', damping: 25, stiffness: 300 }
              }
              className="clay-card relative flex aspect-video max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxSrc(selectedImage)}
                alt={selectedImage.alt || selectedImage.title}
                className="absolute inset-0 h-full w-full object-contain"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
