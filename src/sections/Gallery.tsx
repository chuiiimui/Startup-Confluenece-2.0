import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery } from '../data/gallery';

const galleryCategories = ['All', 'expo', 'workshops', 'speakers', 'audience'] as const;

import SectionHeading from '../components/SectionHeading';
import { FiX, FiZoomIn } from 'react-icons/fi';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(img => img.category === activeCategory);

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
    <section id="gallery" className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute bottom-0 left-0 w-1/2 h-[400px] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <SectionHeading 
          badge="Gallery" 
          title="Previous Event Gallery" 
          alignment="center"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10"
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeGalleryTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === category ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={image.id}
                className="relative break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden glass border border-white/10"
                onClick={() => setSelectedImage(image)}
              >
                {/* Fallback placeholder since actual image src might not exist or be reachable */}
                <div 
                  className={`w-full aspect-[4/3] bg-gradient-to-br ${getGradient(image.id)} flex items-center justify-center relative overflow-hidden`}
                >
                  {image.src ? (
                    <img 
                      src={image.src} 
                      alt={image.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-500" />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent">
                    <span className="text-accent text-xs font-semibold mb-1 uppercase tracking-wider">{image.category}</span>
                    <h4 className="text-white font-heading font-medium text-lg leading-tight">{image.title}</h4>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <FiZoomIn size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-dark/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <FiX size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video max-h-[85vh] rounded-2xl overflow-hidden glass border border-white/20 flex flex-col"
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
                    <span className="text-white/30 font-heading text-4xl">Image Placeholder</span>
                  )}
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark to-transparent">
                 <span className="text-accent text-sm font-semibold mb-2 block">{selectedImage.category}</span>
                 <h3 className="text-2xl font-heading font-semibold text-white">{selectedImage.title}</h3>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
