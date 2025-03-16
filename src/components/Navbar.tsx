
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ShopModerne</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Produits
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
