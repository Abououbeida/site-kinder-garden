import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleWhatsAppOrder = () => {
    const message = `👋 Bonjour, je souhaite commander ce produit :  
    *📌 ${product.name}*  
    💰 Prix : ${product.price} MRU  

    📝 Description : ${product.description}  

    📸 *Image du produit:*  
    ${product.image}`; // Ici, on inclut uniquement le lien de l'image

    const whatsappUrl = `https://wa.me/22247150562?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <p className="font-bold text-lg mt-2">{product.price} MRU</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleWhatsAppOrder}
          className="w-full gap-2"
        >
          <Phone className="h-4 w-4" />
          Commander via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
