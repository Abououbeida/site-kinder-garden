import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Loader2, Menu, X } from 'lucide-react';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productsPerPage = 8;

  const fetchProducts = useCallback(async () => {
    let query = supabase
      .from('products')
      .select('*')
      .order('name')
      .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);

    if (selectedCategory !== null) {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw new Error(error.message);
    }

    return data as Product[];
  }, [selectedCategory, currentPage]);

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', selectedCategory, currentPage],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    setCurrentPage(1);
    refetch();
  }, [selectedCategory, refetch]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categories = [
    { id: null, label: "Tous" },
    { id: 1, label: "Enfants" },
    { id: 3, label: "Cosmétiques" },
    { id: 2, label: "Femmes" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Nos Produits</h1>
            <p className="text-gray-600 mt-2">Découvrez notre sélection de produits de qualité</p>
          </header>

          {/* Filtres avec menu caché */}
          <div className="relative mb-6 w-64">
            {/* Bouton pour afficher les catégories */}
            <button
              className="w-full p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-lg font-semibold">Catégories</span>
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Liste des catégories (cachée par défaut) */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full mt-2 border rounded-lg bg-white shadow-lg z-10">
                <ul className="space-y-2 p-2">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`p-3 rounded-md cursor-pointer transition duration-300 ${
                        selectedCategory === cat.id
                          ? "bg-black text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMenuOpen(false); // Fermer après sélection
                      }}
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Affichage des produits */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Chargement des produits...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Une erreur est survenue lors du chargement des produits.</p>
              <p>Veuillez réessayer plus tard.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                      </PaginationItem>
                    )}

                    {[...Array(5)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext onClick={() => paginate(currentPage + 1)} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
