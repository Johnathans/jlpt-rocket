'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ExternalLink, Filter, GraduationCap } from 'lucide-react';

interface School {
  id: number;
  name: string;
  location: string;
  city: string;
  region: string;
  description: string;
  features: string[];
  jlptLevels: string[];
  type: string;
  duration: string;
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
      name: "ISI Japanese Language School",
      location: "Takadanobaba, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "One of Japan's largest language school groups with multiple campuses. Offers comprehensive JLPT preparation courses with experienced instructors and strong university placement support.",
      features: ["Multiple Campuses", "University Pathway", "JLPT Preparation", "Dormitory Available"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/isi.jpg",
      website: "https://www.isi-global.com"
    },
    {
      id: 2,
      name: "KCP International Japanese Language School",
      location: "Shinjuku, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Established in 1983, KCP offers intensive Japanese language programs with focus on JLPT preparation. Known for small class sizes and personalized attention.",
      features: ["Small Class Sizes", "Cultural Activities", "JLPT Focused", "Experienced Teachers"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/kcp.jpg",
      website: "https://www.kcpinternational.com"
    },
    {
      id: 3,
      name: "Osaka YMCA International School",
      location: "Tennoji, Osaka",
      city: "Osaka",
      region: "Kansai",
      description: "Part of the global YMCA network, offering Japanese language education since 1969. Strong emphasis on practical communication skills and JLPT preparation.",
      features: ["Established 1969", "YMCA Network", "Practical Japanese", "JLPT Courses"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/osaka-ymca.jpg",
      website: "https://www.osakay.ymca.or.jp"
    },
    {
      id: 4,
      name: "Kyoto Minsai Japanese Language School",
      location: "Shimogyo-ku, Kyoto",
      city: "Kyoto",
      region: "Kansai",
      description: "Located in historic Kyoto, offering Japanese language education with cultural immersion. Specializes in JLPT preparation and university entrance exam support.",
      features: ["Cultural Immersion", "University Prep", "Traditional Setting", "JLPT Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/kyoto-minsai.jpg",
      website: "https://www.kyotominsai.co.jp"
    },
    {
      id: 5,
      name: "Fukuoka Foreign Language College",
      location: "Hakata, Fukuoka",
      city: "Fukuoka",
      region: "Kyushu",
      description: "Comprehensive language education in Fukuoka with affordable tuition. Offers JLPT preparation courses and support for students seeking employment in Japan.",
      features: ["Affordable Tuition", "Job Support", "JLPT Preparation", "Multicultural Environment"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/fukuoka-flc.jpg",
      website: "https://www.fflc.ac.jp"
    },
    {
      id: 6,
      name: "ARC Academy Tokyo",
      location: "Shinjuku & Shibuya, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Modern language school with two Tokyo campuses. Known for innovative teaching methods and strong JLPT pass rates. Offers flexible course schedules.",
      features: ["Two Campuses", "Flexible Schedule", "Modern Methods", "High Pass Rates"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/arc-academy.jpg",
      website: "https://www.arc.ac.jp"
    },
    {
      id: 7,
      name: "Sendagaya Japanese Institute",
      location: "Takadanobaba, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Established in 1975, one of Tokyo's most respected language schools. Comprehensive JLPT preparation with focus on all four language skills.",
      features: ["Established 1975", "Comprehensive Curriculum", "JLPT Specialist", "Career Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/sendagaya.jpg",
      website: "https://www.sendagaya.ac.jp"
    },
    {
      id: 8,
      name: "Yokohama Design College",
      location: "Nishi-ku, Yokohama",
      city: "Yokohama",
      region: "Kanto",
      description: "Combines Japanese language education with creative courses. Offers JLPT preparation alongside opportunities to explore Japanese design and culture.",
      features: ["Creative Courses", "Cultural Programs", "JLPT Preparation", "Design Focus"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/yokohama-design.jpg",
      website: "https://www.ydc.ac.jp"
    },
    {
      id: 9,
      name: "Nagoya International School",
      location: "Nakamura-ku, Nagoya",
      city: "Nagoya",
      region: "Chubu",
      description: "Central Japan's leading language school offering comprehensive Japanese programs. Strong focus on JLPT preparation and business Japanese.",
      features: ["Business Japanese", "JLPT Courses", "Central Location", "Internship Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/nagoya-intl.jpg",
      website: "https://www.nis-japan.com"
    },
    {
      id: 10,
      name: "Sapporo International Japanese Language School",
      location: "Chuo-ku, Sapporo",
      city: "Sapporo",
      region: "Hokkaido",
      description: "Experience Japanese language learning in Hokkaido's capital. Offers JLPT preparation in a welcoming environment with lower cost of living.",
      features: ["Affordable Living", "Small Classes", "JLPT Focus", "Nature Access"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/sapporo-intl.jpg",
      website: "https://www.sijs.jp"
    },
    {
      id: 11,
      name: "Intercultural Institute of Japan",
      location: "Akihabara, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Specializes in intensive Japanese language programs with strong JLPT preparation. Located in Akihabara with easy access to Tokyo's cultural attractions.",
      features: ["Intensive Courses", "Central Tokyo", "JLPT Specialist", "Cultural Access"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/iij.jpg",
      website: "https://www.incul.com"
    },
    {
      id: 12,
      name: "Kyushu Sangyo University Japanese Language School",
      location: "Higashi-ku, Fukuoka",
      city: "Fukuoka",
      region: "Kyushu",
      description: "University-affiliated language school offering pathway to undergraduate programs. Strong JLPT preparation with academic focus.",
      features: ["University Pathway", "Academic Focus", "JLPT Preparation", "Campus Facilities"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "University Program",
      duration: "6-24 months",
      image: "/schools/kyushu-sangyo.jpg",
      website: "https://www.kyusan-u.ac.jp"
    },
    {
      id: 13,
      name: "Akamonkai Japanese Language School",
      location: "Nippori, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Large-scale language school with over 2,000 students from 50+ countries. Comprehensive JLPT preparation with proven track record.",
      features: ["Large International Community", "JLPT Specialist", "University Guidance", "Scholarship Programs"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/akamonkai.jpg",
      website: "https://www.akamonkai.ac.jp"
    },
    {
      id: 14,
      name: "Yoshida Institute of Japanese Language",
      location: "Sumida-ku, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Established school focusing on practical Japanese and JLPT preparation. Known for supportive learning environment and experienced faculty.",
      features: ["Practical Focus", "Experienced Faculty", "JLPT Courses", "Student Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/yoshida.jpg",
      website: "https://www.yoshida-edu.ac.jp"
    },
    {
      id: 15,
      name: "Hokkaido Japanese Language Academy",
      location: "Chuo-ku, Sapporo",
      city: "Sapporo",
      region: "Hokkaido",
      description: "Experience authentic Japanese culture in Hokkaido while preparing for JLPT. Offers comprehensive language programs in a beautiful natural setting.",
      features: ["Cultural Immersion", "Nature Activities", "JLPT Preparation", "Affordable Tuition"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/hokkaido-jla.jpg",
      website: "https://www.hjla.jp"
    },
    {
      id: 16,
      name: "Tokyo Galaxy Japanese Language School",
      location: "Shinjuku, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "Modern language school in central Tokyo offering intensive JLPT preparation. Features multimedia classrooms and interactive learning methods.",
      features: ["Modern Facilities", "Interactive Learning", "Central Location", "JLPT Focus"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/tokyo-galaxy.jpg",
      website: "https://www.tokyogalaxy.ac.jp"
    },
    {
      id: 17,
      name: "Kansai Language Institute",
      location: "Kita-ku, Osaka",
      city: "Osaka",
      region: "Kansai",
      description: "Well-established school in Osaka offering comprehensive Japanese programs. Strong emphasis on JLPT preparation and cultural understanding.",
      features: ["Established School", "Cultural Programs", "JLPT Specialist", "Career Support"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "6-24 months",
      image: "/schools/kansai-language.jpg",
      website: "https://www.kli.ac.jp"
    },
    {
      id: 18,
      name: "Tokyo International Japanese School",
      location: "Shinjuku, Tokyo",
      city: "Tokyo",
      region: "Kanto",
      description: "International environment with students from diverse backgrounds. Offers structured JLPT preparation courses with experienced instructors.",
      features: ["International Environment", "Structured Curriculum", "JLPT Courses", "Dormitory Available"],
      jlptLevels: ["N5", "N4", "N3", "N2", "N1"],
      type: "Language School",
      duration: "3-24 months",
      image: "/schools/tokyo-intl.jpg",
      website: "https://www.tijs.jp"
    }
  ];

  const regions = ['all', 'Kanto', 'Kansai', 'Chubu', 'Kyushu', 'Hokkaido'];
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
                  {/* School Website Screenshot */}
                  <div className="lg:w-64 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={`https://image.thum.io/get/width/400/crop/300/noanimate/${school.website}`}
                      alt={`${school.name} website`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to gradient if screenshot fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.classList.add('bg-gradient-to-br', 'from-pink-100', 'to-orange-100', 'flex', 'items-center', 'justify-center');
                          const icon = document.createElement('div');
                          icon.innerHTML = '<svg class="h-16 w-16 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';
                          target.parentElement.appendChild(icon);
                        }
                      }}
                    />
                  </div>

                  {/* School Info */}
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {school.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {school.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {school.duration}
                        </span>
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
