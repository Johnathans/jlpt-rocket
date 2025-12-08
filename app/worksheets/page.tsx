'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import { X, ChevronDown, ChevronUp, Search, Download, Sparkles, BookOpen, Filter } from 'lucide-react';
import Link from 'next/link';
import type { Worksheet, WorksheetFilters } from '@/types/worksheet';

function WorksheetsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [mounted, setMounted] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [showInteractiveOnly, setShowInteractiveOnly] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Accordion states
  const [expandedSections, setExpandedSections] = useState({
    levels: true,
    categories: true,
    difficulty: true,
    type: true,
  });

  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1', 'All'];
  const categories = [
    'Kanji',
    'Vocabulary',
    'Grammar',
    'Verbs',
    'Adjectives',
    'Nouns',
    'Particles',
    'Reading',
    'Writing',
  ];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  // Load filters from URL on mount
  useEffect(() => {
    const levels = searchParams.get('levels')?.split(',').filter(Boolean) || [];
    const cats = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const diff = searchParams.get('difficulty')?.split(',').filter(Boolean) || [];
    const interactive = searchParams.get('interactive') === 'true';
    const search = searchParams.get('search') || '';
    
    setSelectedLevels(levels);
    setSelectedCategories(cats);
    setSelectedDifficulty(diff);
    setShowInteractiveOnly(interactive);
    setSearchQuery(search);
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedLevels.length > 0) params.set('levels', selectedLevels.join(','));
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
    if (selectedDifficulty.length > 0) params.set('difficulty', selectedDifficulty.join(','));
    if (showInteractiveOnly) params.set('interactive', 'true');
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'popular') params.set('sort', sortBy);
    
    const queryString = params.toString();
    router.push(`/worksheets${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [selectedLevels, selectedCategories, selectedDifficulty, showInteractiveOnly, searchQuery, sortBy]);

  // Fetch worksheets (mock data for now)
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockWorksheets: Worksheet[] = [
      {
        id: 'n5-kanji',
        title: 'N5 Kanji Practice Sheet',
        description: '~80 basic kanji with stroke order diagrams for writing practice',
        thumbnail_url: '/worksheets/n5-kanji-preview.png',
        jlpt_level: 'N5',
        category: 'Kanji',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 2450,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n5'],
        pdf_url: '/worksheets/n5-kanji-practice-sheet.pdf',
      },
      {
        id: 'n4-kanji',
        title: 'N4 Kanji Practice Sheet',
        description: '~170 elementary kanji with stroke order diagrams',
        thumbnail_url: '/worksheets/n4-kanji-preview.png',
        jlpt_level: 'N4',
        category: 'Kanji',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 1890,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n4'],
        pdf_url: '/worksheets/n4-kanji-practice-sheet.pdf',
      },
      {
        id: 'n3-kanji',
        title: 'N3 Kanji Practice Sheet',
        description: '~370 intermediate kanji with stroke order diagrams',
        thumbnail_url: '/worksheets/n3-kanji-preview.png',
        jlpt_level: 'N3',
        category: 'Kanji',
        difficulty: 'Intermediate',
        is_interactive: false,
        is_premium: false,
        download_count: 1560,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n3'],
        pdf_url: '/worksheets/n3-kanji-practice-sheet.pdf',
      },
      {
        id: 'n2-kanji',
        title: 'N2 Kanji Practice Sheet',
        description: '~370 advanced kanji with stroke order diagrams',
        thumbnail_url: '/worksheets/n2-kanji-preview.png',
        jlpt_level: 'N2',
        category: 'Kanji',
        difficulty: 'Advanced',
        is_interactive: false,
        is_premium: false,
        download_count: 1240,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n2'],
        pdf_url: '/worksheets/n2-kanji-practice-sheet.pdf',
      },
      {
        id: 'n1-kanji',
        title: 'N1 Kanji Practice Sheet',
        description: '~1,200 expert kanji with stroke order diagrams',
        thumbnail_url: '/worksheets/n1-kanji-preview.png',
        jlpt_level: 'N1',
        category: 'Kanji',
        difficulty: 'Advanced',
        is_interactive: false,
        is_premium: false,
        download_count: 980,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n1'],
        pdf_url: '/worksheets/n1-kanji-practice-sheet.pdf',
      },
      {
        id: 'hiragana',
        title: 'Hiragana Practice Sheet',
        description: 'Master all hiragana characters with writing practice',
        thumbnail_url: '/worksheets/hiragana-preview.png',
        jlpt_level: 'N5',
        category: 'Writing',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 3250,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['hiragana', 'writing', 'beginner'],
        pdf_url: '/worksheets/hiragana-practice-sheet.pdf',
      },
      {
        id: 'katakana',
        title: 'Katakana Practice Sheet',
        description: 'Master all katakana characters with writing practice',
        thumbnail_url: '/worksheets/katakana-preview.png',
        jlpt_level: 'N5',
        category: 'Writing',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 2890,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['katakana', 'writing', 'beginner'],
        pdf_url: '/worksheets/katakana-practice-sheet.pdf',
      },
    ];
    
    setWorksheets(mockWorksheets);
    setLoading(false);
  }, []);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  };

  const clearAllFilters = () => {
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSelectedDifficulty([]);
    setShowInteractiveOnly(false);
    setSearchQuery('');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFilterCount = selectedLevels.length + selectedCategories.length + selectedDifficulty.length + (showInteractiveOnly ? 1 : 0);

  const filteredWorksheets = worksheets.filter(worksheet => {
    if (selectedLevels.length > 0 && !selectedLevels.includes(worksheet.jlpt_level)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(worksheet.category)) return false;
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(worksheet.difficulty)) return false;
    if (showInteractiveOnly && !worksheet.is_interactive) return false;
    if (searchQuery && !worksheet.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !worksheet.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Sign Up Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-pink-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <p className="text-sm text-gray-700">
              Get unlimited access to all worksheets, practice tools, and JLPT learning resources with
              <Link href="/pricing" className="ml-1 font-semibold text-pink-600 hover:text-pink-700 underline decoration-pink-300">
                Premium
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Worksheets</span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                JLPT Worksheets
              </h1>
              <div className="h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Practice and master Japanese with our comprehensive worksheet collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                showMobileFilters 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:border-pink-300'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && !showMobileFilters && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-pink-500 text-white text-xs font-bold rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
            
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-pink-600 hover:text-pink-700 font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sidebar Filters */}
          <aside className={`lg:w-72 flex-shrink-0 space-y-4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Mobile Close Button */}
            {showMobileFilters && (
              <div className="lg:hidden flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            )}

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search worksheets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-sm"
                />
              </div>
            </div>


            {/* JLPT Level - Card Style */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">JLPT Level</h3>
              <div className="grid grid-cols-2 gap-2">
                {jlptLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => toggleLevel(level)}
                    className={`px-4 py-4 rounded-lg text-xl font-black transition-all ${
                      selectedLevels.includes(level)
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Category</h3>
              <div className="space-y-1.5">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-pink-50 text-pink-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Difficulty</h3>
              <div className="space-y-1.5">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedDifficulty.includes(difficulty)
                        ? 'bg-pink-50 text-pink-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Type</h3>
              <button
                onClick={() => setShowInteractiveOnly(!showInteractiveOnly)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  showInteractiveOnly
                    ? 'bg-pink-50 text-pink-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Interactive Only
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters Pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {selectedLevels.map(level => (
                  <span
                    key={level}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium border border-pink-200"
                  >
                    {level}
                    <button onClick={() => toggleLevel(level)} className="hover:text-pink-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                {selectedCategories.map(category => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium border border-pink-200"
                  >
                    {category}
                    <button onClick={() => toggleCategory(category)} className="hover:text-pink-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                {selectedDifficulty.map(difficulty => (
                  <span
                    key={difficulty}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium border border-pink-200"
                  >
                    {difficulty}
                    <button onClick={() => toggleDifficulty(difficulty)} className="hover:text-pink-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-pink-600 hover:text-pink-700 font-semibold underline"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{filteredWorksheets.length}</span> {filteredWorksheets.length === 1 ? 'worksheet' : 'worksheets'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>

            {/* Worksheets Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : filteredWorksheets.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No worksheets found matching your filters</p>
                  <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredWorksheets.map(worksheet => (
                  <Link
                    key={worksheet.id}
                    href={`/worksheets/${worksheet.id}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-pink-200 transition-all duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-gray-100 relative">
                      {worksheet.is_interactive && (
                        <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Interactive
                        </span>
                      )}
                      {worksheet.thumbnail_url ? (
                        <img 
                          src={worksheet.thumbnail_url} 
                          alt={worksheet.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <BookOpen className="h-12 w-12" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded">
                          {worksheet.jlpt_level}
                        </span>
                        <span className="text-xs text-gray-600 hidden sm:inline">{worksheet.category}</span>
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                        {worksheet.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 hidden sm:block">
                        {worksheet.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="hidden sm:inline">{worksheet.difficulty}</span>
                        <span className="flex items-center gap-1 ml-auto">
                          <Download className="h-3 w-3" />
                          {worksheet.download_count}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function WorksheetsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    }>
      <WorksheetsContent />
    </Suspense>
  );
}
