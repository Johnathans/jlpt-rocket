'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, Star, ExternalLink, Filter } from 'lucide-react';

interface School {
  id: number;
  name: string;
  location: string;
  city: string;
  region: string;
  description: string;
  features: string[];
  jlptLevels: string[];
  studentCapacity: string;
  duration: string;
  rating: number;
  image: string;
  website: string;
}

export default function SchoolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    document.title = 'Find JLPT Schools in Japan - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Find the best Japanese language schools in Japan for JLPT preparation. Browse schools by location, JLPT level, and features.');
    updateMetaTag('keywords', 'jlpt schools japan, japanese language schools, jlpt preparation schools, study japanese in japan');
  }, []);

  const schools: School[] = [
    {
      id: 1,
      name: "Tokyo Central Japanese Language School",
      location: "Shinjuku, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Specialized JLPT preparation courses with experienced instructors. Located in the heart of Tokyo with excellent access to cultural experiences.",
      features: ["JLPT Focused Curriculum", "Small Class Sizes", "Cultural Activities", "Job Placement Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      studentCapacity: "500+ students",
      duration: "3-24 months",
      rating: 4.8,
      image: "/schools/tokyo-central.jpg",
      website: "https://example.com"
    },
    {
      id: 2,
      name: "Osaka International Academy",
      location: "Namba, Osaka",
      city: "Osaka",
      region: "Kansai",
      description: "Comprehensive Japanese language programs with strong focus on JLPT exam preparation and practical conversation skills.",
      features: ["JLPT Test Center", "Dormitory Available", "Part-time Job Support", "University Pathway"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      studentCapacity: "400+ students",
      duration: "6-24 months",
      rating: 4.7,
      image: "/schools/osaka-international.jpg",
      website: "https://example.com"
    },
    {
      id: 3,
      name: "Kyoto Language Institute",
      location: "Kawaramachi, Kyoto",
      city: "Kyoto",
      region: "Kansai",
      description: "Traditional and modern teaching methods in historic Kyoto. Excellent JLPT pass rates and cultural immersion opportunities.",
      features: ["Traditional Culture Classes", "Tea Ceremony", "Calligraphy", "JLPT Intensive Courses"],
      jlptLevels: ["N5", "N4", "N3", "N2"],
      studentCapacity: "300+ students",
      duration: "3-18 months",
      rating: 4.9,
      image: "/schools/kyoto-language.jpg",
      website: "https://example.com"
    },
    {
      id: 4,
      name: "Fukuoka Japanese Language Center",
      location: "Tenjin, Fukuoka",
      city: "Fukuoka",
      region: "Kyushu",
      description: "Affordable tuition with high-quality JLPT preparation. Friendly atmosphere and lower cost of living compared to Tokyo.",
      features: ["Affordable Tuition", "Homestay Programs", "Business Japanese", "JLPT Mock Tests"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      studentCapacity: "250+ students",
      duration: "6-24 months",
      rating: 4.6,
      image: "/schools/fukuoka-center.jpg",
      website: "https://example.com"
    },
    {
      id: 5,
      name: "Yokohama Japanese Academy",
      location: "Minato Mirai, Yokohama",
      city: "Yokohama",
      region: "Kanto",
      description: "Modern facilities with cutting-edge teaching technology. Strong track record of JLPT success and university admissions.",
      features: ["Modern Facilities", "Online Learning Support", "Career Counseling", "Scholarship Available"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      studentCapacity: "350+ students",
      duration: "3-24 months",
      rating: 4.7,
      image: "/schools/yokohama-academy.jpg",
      website: "https://example.com"
    },
    {
      id: 6,
      name: "Sapporo Language School",
      location: "Susukino, Sapporo",
      city: "Sapporo",
      region: "Hokkaido",
      description: "Experience Japanese language learning in beautiful Hokkaido. Small class sizes and personalized attention for JLPT preparation.",
      features: ["Small Classes", "Winter Sports", "Nature Activities", "Personalized Learning"],
      jlptLevels: ["N5", "N4", "N3", "N2"],
      studentCapacity: "150+ students",
      duration: "6-18 months",
      rating: 4.8,
      image: "/schools/sapporo-language.jpg",
      website: "https://example.com"
    }
  ];

  const regions = ['all', 'Kanto', 'Kansai', 'Kyushu', 'Hokkaido'];
  const jlptLevels = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
    const matchesLevel = selectedLevel === 'all' || school.jlptLevels.includes(selectedLevel);
    
    return matchesSearch && matchesRegion && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your JLPT School in Japan</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover top-rated Japanese language schools offering comprehensive JLPT preparation courses across Japan.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by school name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JLPT Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {jlptLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredSchools.length}</span> schools
          </p>
        </div>

        <div className="grid gap-6">
          {filteredSchools.map(school => (
            <div key={school.id} className="bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* School Image Placeholder */}
                  <div className="lg:w-64 h-48 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-16 w-16 text-pink-400" />
                  </div>

                  {/* School Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {school.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {school.studentCapacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {school.duration}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                        <span className="font-semibold text-gray-900">{school.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{school.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* JLPT Levels */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-700">JLPT Levels:</span>
                      <div className="flex gap-2">
                        {school.jlptLevels.map(level => (
                          <span
                            key={level}
                            className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <a
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Contact School
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No schools found matching your criteria</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prepare for JLPT Before You Go
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Start your JLPT preparation now with Rocket JLPT and arrive at your school ready to succeed.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
            >
              Start Learning Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
