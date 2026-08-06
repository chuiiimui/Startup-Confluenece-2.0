export interface FeaturedStartup {
  id: string;
  name: string;
  domain: string;
  description: string;
  logo: string;
  image: string;
}

export const featuredStartups: FeaturedStartup[] = [
  {
    id: 'fs-1',
    name: 'AeroFarms',
    domain: 'AgriTech',
    description: 'Pioneering indoor vertical farming with aeroponic technology.',
    logo: '🌱',
    image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5e4bf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'fs-2',
    name: 'NeuroSync',
    domain: 'HealthTech',
    description: 'Brain-computer interfaces for neuro-rehabilitation and cognitive enhancement.',
    logo: '🧠',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'fs-3',
    name: 'QuantumPay',
    domain: 'FinTech',
    description: 'Quantum-secure ledger technology for next-generation global payments.',
    logo: '💳',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'fs-4',
    name: 'EcoBuild',
    domain: 'Construction Tech',
    description: 'Sustainable, modular building materials created from recycled ocean plastics.',
    logo: '🏗️',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'fs-5',
    name: 'Lumina AI',
    domain: 'AI & Machine Learning',
    description: 'Generative AI models designed for high-fidelity architectural visualization.',
    logo: '✨',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
];
