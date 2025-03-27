
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique d'envoi du formulaire ici
    alert('Votre message a été envoyé!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Contactez-nous</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Nous sommes à votre disposition pour toute question ou demande d'information. N'hésitez pas à nous contacter.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" placeholder="Votre nom" required />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Votre email" required />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="Votre message"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">Envoyer le message</Button>
              </form>
              
              <div className="mt-12 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-600">426C+89P Nouakchott, Mauritania</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-600">+222 34346758</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact.hdstyle@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
              <MapComponent location={{ lat: 48.8566, lng: 2.3522 }} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
