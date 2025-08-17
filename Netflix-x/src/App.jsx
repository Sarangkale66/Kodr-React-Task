import React, { useState, useEffect } from 'react';
import { Play, Info, Search, Bell, User, ChevronLeft, ChevronRight, Star, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Trending Now');
  const [activeGenres, setActiveGenres] = useState(['Action', 'Avon', 'Comedy']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    'Trending Now', 'Popular', 'Netflix Original', 'Premiers', 'Recently Added'
  ];

  const genres = [
    'Action', 'Adventure', 'Avon', 'Biography', 'Crime', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  const movieData = {
    'Trending Now': [
      { title: "Money Heist: Season 2", rating: 4.5, year: 2018, genre: "Crime, Drama", bg: "linear-gradient(135deg, #dc2626 0%, #7c2d12 100%)", isNew: true },
      { title: "Star Trek - Discovery", rating: 4.2, year: 2020, genre: "Sci-Fi, Adventure", bg: "linear-gradient(135deg, #1e40af 0%, #374151 100%)", isNetflix: true },
      { title: "13 Reasons Why", rating: 4.1, year: 2019, genre: "Drama, Teen", bg: "linear-gradient(135deg, #374151 0%, #1f2937 100%)", isNetflix: true },
      { title: "Seinfeld", rating: 4.8, year: 1989, genre: "Comedy, Classic", bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
      { title: "Hyperion Ari", rating: 4.3, year: 2021, genre: "Action, Thriller", bg: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)", isNew: true },
      { title: "Dave Chappelle: Sticks", rating: 4.6, year: 2022, genre: "Comedy, Stand-up", bg: "linear-gradient(135deg, #6b7280 0%, #374151 100%)", isNetflix: true },
      { title: "The Crown", rating: 4.7, year: 2020, genre: "Drama, Biography", bg: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)", isNetflix: true },
      { title: "Breaking Bad", rating: 4.9, year: 2008, genre: "Crime, Drama", bg: "linear-gradient(135deg, #059669 0%, #064e3b 100%)" }
    ],
    'Popular': [
      { title: "Squid Game", rating: 4.8, year: 2021, genre: "Thriller, Drama", bg: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)", isNetflix: true, isNew: true },
      { title: "Wednesday", rating: 4.5, year: 2022, genre: "Comedy, Horror", bg: "linear-gradient(135deg, #374151 0%, #111827 100%)", isNetflix: true },
      { title: "Ozark", rating: 4.4, year: 2020, genre: "Crime, Drama", bg: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)", isNetflix: true },
      { title: "The Witcher", rating: 4.3, year: 2021, genre: "Fantasy, Adventure", bg: "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)", isNetflix: true },
      { title: "You", rating: 4.2, year: 2022, genre: "Thriller, Drama", bg: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)", isNetflix: true },
      { title: "Emily in Paris", rating: 3.9, year: 2022, genre: "Romance, Comedy", bg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)", isNetflix: true }
    ],
    'Netflix Original': [
      { title: "Stranger Things 4", rating: 4.7, year: 2022, genre: "Sci-Fi, Horror", bg: "linear-gradient(135deg, #dc2626 0%, #450a0a 100%)", isNetflix: true },
      { title: "The Umbrella Academy", rating: 4.4, year: 2022, genre: "Superhero, Drama", bg: "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)", isNetflix: true },
      { title: "Orange Is the New Black", rating: 4.1, year: 2019, genre: "Drama, Comedy", bg: "linear-gradient(135deg, #ea580c 0%, #9a3412 100%)", isNetflix: true },
      { title: "House of Cards", rating: 4.0, year: 2018, genre: "Political Drama", bg: "linear-gradient(135deg, #374151 0%, #1f2937 100%)", isNetflix: true },
      { title: "BoJack Horseman", rating: 4.6, year: 2020, genre: "Animation, Comedy", bg: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", isNetflix: true }
    ]
  };

  const toggleGenre = (genre) => {
    setActiveGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const MovieCard = ({ movie, index }) => (
    <div className="flex-shrink-0 w-48 md:w-56 lg:w-64 group cursor-pointer relative">
      <div className="relative">
        <div
          className="aspect-[3/4] rounded-lg mb-3 transition-all duration-300 group-hover:scale-105 group-hover:z-10 relative"
          style={{ background: movie.bg }}
        >
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {movie.isNew && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
            )}
            {movie.isNetflix && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">N</span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <button className="bg-white text-black rounded-full p-1 hover:bg-gray-200">
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <button className="bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 ml-auto">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-500 font-semibold">95% Match</span>
                  <span className="border border-gray-500 px-1">{movie.year}</span>
                </div>
                <p className="text-gray-300">{movie.genre}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors truncate">
            {movie.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-gray-400">{movie.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{movie.year}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ContentRow = ({ title, movies }) => (
    <section className="px-4 md:px-12 lg:px-16 mb-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative group">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} index={index} />
          ))}
        </div>
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black/70 hover:bg-black/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black/70 hover:bg-black/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
        <nav className="flex items-center justify-between px-4 md:px-12 lg:px-16 py-4">
          <div className="flex items-center space-x-8">
            <div className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer hover:text-red-500 transition-colors">
              NETFLIX
            </div>
            <ul className="hidden lg:flex space-x-6 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Movies</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">New & Popular</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">My List</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Browse by Languages</a></li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <span className="hidden md:inline text-sm cursor-pointer hover:text-gray-300 transition-colors">Kids</span>
            <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <div className="relative">
              <User className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors bg-red-600 rounded p-1" />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-black via-black/50 to-transparent">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/80">
              <div
                className="w-full h-full relative"
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), 
                              radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 40%, #000000 100%)`
                }}
              >
                {/* Floating elements for Lost in Space theme */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-4 md:px-12 lg:px-16 max-w-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-yellow-500 text-black px-3 py-1 text-sm font-bold rounded">18+</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium">7.5</span>
            </div>
            <span className="text-sm text-gray-300">2018</span>
            <span className="text-sm text-gray-300">3 Seasons</span>
            <span className="text-sm text-gray-300">HD</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wider drop-shadow-2xl">
            LOST IN SPACE
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-lg">
            After crash-landing on an alien planet, the Robinson family fights against all odds to survive and escape, but they're surrounded by hidden dangers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex items-center justify-center space-x-3 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" />
              <span>WATCH</span>
            </button>
            <button className="flex items-center justify-center space-x-3 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 transition-all duration-300 backdrop-blur-sm">
              <Info className="w-5 h-5" />
              <span>ADD TO LIST</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-4 md:px-12 lg:px-16 mb-8">
        <div className="flex space-x-8 border-b border-gray-800 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`pb-3 text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === category
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Genre Buttons */}
      <section className="px-4 md:px-12 lg:px-16 mb-8">
        <div className="flex flex-wrap gap-3">
          {genres.map((genre, index) => (
            <button
              key={index}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGenres.includes(genre)
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Movie Rows */}
      <div className="space-y-8 pb-16">
        <ContentRow title={activeCategory} movies={movieData[activeCategory] || movieData['Trending Now']} />

        {Object.entries(movieData)
          .filter(([title]) => title !== activeCategory)
          .map(([title, movies]) => (
            <ContentRow key={title} title={title} movies={movies} />
          ))}

        {/* Additional Content Rows */}
        <ContentRow title="Continue Watching for John" movies={movieData['Popular'].slice(0, 6)} />
        <ContentRow title="Action Movies" movies={movieData['Trending Now'].filter(m => m.genre.includes('Action'))} />
        <ContentRow title="Comedy Specials" movies={movieData['Netflix Original'].filter(m => m.genre.includes('Comedy'))} />
        <ContentRow title="Sci-Fi Adventures" movies={movieData['Trending Now'].filter(m => m.genre.includes('Sci-Fi'))} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 py-16 px-4 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="text-gray-300 font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Netflix</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-gray-300 font-medium">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-gray-300 font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-gray-300 font-medium">Social</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">© 2024 Netflix Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;