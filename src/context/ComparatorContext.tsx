import React, { createContext, useContext, useState, useEffect } from 'react';
import { Establishment } from '../types';
import { ESTABLISHMENTS_DATA } from '../data/establishments';
import { useToast } from './ToastContext';

interface ComparatorContextType {
  comparedItems: Establishment[];
  addToComparator: (item: Establishment) => boolean;
  removeFromComparator: (id: string) => void;
  isInComparator: (id: string) => boolean;
  clearComparator: () => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: Establishment | null;
}

const ComparatorContext = createContext<ComparatorContextType | undefined>(undefined);

export const ComparatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    return localStorage.getItem('luka_selected_product_id') || '1';
  });

  const [comparedItems, setComparedItems] = useState<Establishment[]>(() => {
    try {
      const saved = localStorage.getItem('luka_compared_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    // Default 2 items to compare if none
    return [ESTABLISHMENTS_DATA[0], ESTABLISHMENTS_DATA[1]].filter(Boolean);
  });

  useEffect(() => {
    try {
      localStorage.setItem('luka_compared_items', JSON.stringify(comparedItems));
    } catch {
      // ignore
    }
  }, [comparedItems]);

  useEffect(() => {
    if (selectedProductId) {
      localStorage.setItem('luka_selected_product_id', selectedProductId);
    }
  }, [selectedProductId]);

  const selectedProduct = ESTABLISHMENTS_DATA.find((e) => e.id === selectedProductId) || ESTABLISHMENTS_DATA[0];

  const isInComparator = (id: string) => {
    return comparedItems.some((item) => item.id === id);
  };

  const addToComparator = (item: Establishment): boolean => {
    if (comparedItems.some((i) => i.id === item.id)) {
      showToast(`${item.name} est déjà dans votre comparateur`, 'info');
      return false;
    }
    if (comparedItems.length >= 4) {
      showToast('Vous pouvez comparer au maximum 4 éléments à la fois.', 'warning');
      return false;
    }
    setComparedItems((prev) => [...prev, item]);
    showToast(`${item.name} ajouté au comparateur (${comparedItems.length + 1}/4)`, 'success');
    return true;
  };

  const removeFromComparator = (id: string) => {
    const item = comparedItems.find((i) => i.id === id);
    setComparedItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`${item.name} retiré du comparateur`, 'info');
    }
  };

  const clearComparator = () => {
    setComparedItems([]);
    showToast('Le comparateur a été réinitialisé', 'info');
  };

  return (
    <ComparatorContext.Provider
      value={{
        comparedItems,
        addToComparator,
        removeFromComparator,
        isInComparator,
        clearComparator,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
      }}
    >
      {children}
    </ComparatorContext.Provider>
  );
};

export const useComparator = (): ComparatorContextType => {
  const context = useContext(ComparatorContext);
  if (!context) {
    throw new Error('useComparator must be used within a ComparatorProvider');
  }
  return context;
};
