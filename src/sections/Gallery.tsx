import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery } from '../data/gallery';

import SectionHeading from '../components/SectionHeading';
import ImageReveal from '../components/ImageReveal';
import DepthFrame from '../components/interactive3d/DepthFrame';
import { FiX, FiZoomIn } from 'react-icons/fi';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? gallery : gallery.slice(0, 9);

  // Generate a random gradient for placeholders since we don't have images
  const getGradient = (id: string | number) => {
    const gradients = [
      'from-blue-500/20 to-purple-500/20',
      'from-accent/20 to-orange-500/20',
      'from-emerald-500/20 to-teal-500/20',
      'from-rose-500/20 to-pink-500/20',
      'from-indigo-500/20 to-cyan-500/20',
    ];
    const index = parseInt(id.toString().replace(/\D/g, '')) % gradients.length || 0;
    return gradients[index];
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden" >
      <div className="absolute bottom-0 left-0 w-1/2 h-[400px] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <SectionHeading 
          badge="Gallery" 
          title="Previous Event Gallery" 
          alignment="center"
        />


        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedImages.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={image.id}
                className="relative break-inside-avoid"
              >
                <DepthFrame
                  className="group cursor-pointer overflow-hidden rounded-2xl border"
                  style={{ borderColor: 'var(--border)' }}
                  data-cursor="image"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800/40">
                    {image.src ? (
                      <ImageReveal
                        src={image.src}
                        alt={image.title}
                        className="absolute inset-0 h-full w-full"
                        imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center bg-violet-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/25 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                        <FiZoomIn size={24} />
                      </div>
                    </div>
                  </div>
                </DepthFrame>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {gallery.length > 9 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-full border px-8 py-3 font-medium shadow-sm transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
              }}
            >
              {showAll ? 'Show Less' : 'View All Images'}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} // Kept dark for lightbox
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full transition-colors z-50"
              style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <FiX size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video max-h-[85vh] rounded-2xl overflow-hidden glass border flex flex-col"
              style={{ borderColor: 'var(--border)' }}
              onClick={(e) => e.stopPropagation()}
            >
               <div className={`w-full h-full bg-gradient-to-br ${getGradient(selectedImage.id)} relative flex items-center justify-center`}>
                  {selectedImage.src ? (
                    <img 
                      src={selectedImage.src} 
                      alt={selectedImage.title}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <span className="font-heading text-4xl" style={{ color: 'var(--text-muted)' }}>Image Placeholder</span>
                  )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
