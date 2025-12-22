'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface KanjiSearchClientProps {
  level: string;
}

export default function KanjiSearchClient({ level }: KanjiSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Filter kanji grid on the page
    const kanjiGrid = document.getElementById('kanji-grid');
    if (!kanjiGrid) return;
    
    const kanjiCards = kanjiGrid.querySelectorAll('a');
    kanjiCards.forEach((card) => {
      const character = card.querySelector('.font-japanese')?.textContent || '';
      const meaning = card.querySelector('.text-gray-500')?.textContent || '';
      
      const matches = character.includes(term) || 
                     meaning.toLowerCase().includes(term.toLowerCase());
      
      if (matches || term === '') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  return (
    <div className="relative flex-1 max-w-lg mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search by character or meaning..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
      />
    </div>
  );
}
