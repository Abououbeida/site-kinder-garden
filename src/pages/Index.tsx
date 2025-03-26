import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section avec Vidéo */}
        <section className="relative h-screen">
          <video 
            className="absolute inset-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop
            poster="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg"
          >
            <source src="https://www.example.com/your-video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
            <div className="container mx-auto px-4 text-white text-center max-w-lg">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Découvrez Notre Collection</h1>
              <p className="text-xl mb-8">Des produits de qualité sélectionnés pour vous. Explorez notre gamme exclusive dès aujourd'hui.</p>
              <Button asChild size="lg" className="group">
                <Link to="/products">
                  Voir nos produits 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Caractéristiques */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Qualité Premium", description: "Tous nos produits sont sélectionnés pour leur qualité exceptionnelle.", icon: "M5 13l4 4L19 7" },
                { title: "Prix Compétitifs", description: "Nous proposons les meilleurs prix du marché pour nos produits.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { title: "Service Client", description: "Notre équipe est toujours disponible pour vous aider par WhatsApp.", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Vidéo YouTube */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Qui Sommes-nous ?</h2>

            <div className="flex justify-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/H6EZGMMcquI"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Notre Vidéo"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Section Nouveautés */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Nouveautés</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 1, image: "https://i.imgur.com/DAjgx7n.jpg", title: "Vêtements Enfants", description: "Découvrez notre collection tendance pour les petits." },
                { id: 2, image: "https://i.postimg.cc/VN4xj02M/Melhfa-Chega-032-C.jpg", title: "Melehfas de Qualité", description: "Des tissus raffinés pour un confort et une élégance assurés." },
                { id: 3, image: "https://i.postimg.cc/qR3Gp9cR/9hz9a3mn.png", title: "Produits Cosmétiques", description: "Prenez soin de vous avec notre gamme haut de gamme." }
              ].map((item) => (
                <div key={item.id} className="group">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/products">
                      En savoir plus
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
