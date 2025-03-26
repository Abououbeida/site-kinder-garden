import React, { useState, useEffect } from 'react';
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
import { Loader2 } from 'lucide-react';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const productsPerPage = 8;

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    console.log("Catégorie sélectionnée :", selectedCategory);

    let query = supabase.from('products').select('*').order('name');

    if (selectedCategory !== null) {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw new Error(error.message);
    }
    
    return data as Product[];
  };

  // Utilisation de useQuery pour charger les produits
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', selectedCategory], // Actualise selon la catégorie
    queryFn: fetchProducts,
  });

  // Mettre à jour les produits à chaque changement de catégorie
  useEffect(() => {
    setCurrentPage(1); // Reset pagination
    refetch();
  }, [selectedCategory, refetch]);

  // Pagination
  const totalProducts = products?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Liste des catégories disponibles
  const categories = [
    { id: null, label: "Tous" },
    { id: 1, label: "Enfants" },
    { id: 2, label: "Cosmétiques" },
    { id: 3, label: "Femmes" },
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

          {/* Filtres par catégorie */}
          <div className="mb-6 flex space-x-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 border rounded transition ${
                  selectedCategory === cat.id ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
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
                {currentProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                        </PaginationItem>
                      )}

                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => paginate(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
