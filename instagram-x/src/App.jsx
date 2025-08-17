import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Grid, Film, User, Settings, Grid3X3, Play } from 'lucide-react';

const mockPosts = [
  { id: 1, image: 'https://picsum.photos/400/400?random=1', likes: 1234, comments: 56 },
  { id: 2, image: 'https://picsum.photos/400/400?random=2', likes: 2341, comments: 78 },
  { id: 3, image: 'https://picsum.photos/400/400?random=3', likes: 3456, comments: 90 },
  { id: 4, image: 'https://picsum.photos/400/400?random=4', likes: 4567, comments: 123 },
  { id: 5, image: 'https://picsum.photos/400/400?random=5', likes: 5678, comments: 145 },
  { id: 6, image: 'https://picsum.photos/400/400?random=6', likes: 6789, comments: 167 },
  { id: 7, image: 'https://picsum.photos/400/400?random=7', likes: 7890, comments: 189 },
  { id: 8, image: 'https://picsum.photos/400/400?random=8', likes: 8901, comments: 201 },
  { id: 9, image: 'https://picsum.photos/400/400?random=9', likes: 9012, comments: 223 },
];

const mockReels = [
  { id: 1, image: 'https://picsum.photos/400/600?random=10', views: '12.3K' },
  { id: 2, image: 'https://picsum.photos/400/600?random=11', views: '23.4K' },
  { id: 3, image: 'https://picsum.photos/400/600?random=12', views: '34.5K' },
  { id: 4, image: 'https://picsum.photos/400/600?random=13', views: '45.6K' },
  { id: 5, image: 'https://picsum.photos/400/600?random=14', views: '56.7K' },
  { id: 6, image: 'https://picsum.photos/400/600?random=15', views: '67.8K' },
];

const mockTagged = [
  { id: 1, image: 'https://picsum.photos/400/400?random=16', likes: 1111, comments: 22 },
  { id: 2, image: 'https://picsum.photos/400/400?random=17', likes: 2222, comments: 33 },
  { id: 3, image: 'https://picsum.photos/400/400?random=18', likes: 3333, comments: 44 },
  { id: 4, image: 'https://picsum.photos/400/400?random=19', likes: 4444, comments: 55 },
];

const ProfileHeader = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-white p-1">
                <img
                  src="https://picsum.photos/200/200?random=profile"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
              <h1 className="text-2xl font-light">johndoe_official</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-1.5 text-sm font-semibold rounded transition-colors ${isFollowing
                    ? 'bg-gray-200 text-black hover:bg-gray-300'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-6 py-1.5 text-sm font-semibold bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors">
                  Message
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-6">
              <div className="text-center">
                <span className="block text-lg font-semibold">1,234</span>
                <span className="text-gray-500 text-sm">posts</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">567K</span>
                <span className="text-gray-500 text-sm">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">890</span>
                <span className="text-gray-500 text-sm">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-center md:text-left">
              <div className="font-semibold mb-1">John Doe</div>
              <div className="text-sm text-gray-600 mb-2">
                📸 Photography enthusiast<br />
                🌍 Travel lover<br />
                💡 Creating memories one click at a time<br />
                📍 New York, NY
              </div>
              <a href="#" className="text-blue-900 font-semibold text-sm">
                www.johndoe-photography.com
              </a>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
          {['Travel', 'Food', 'Nature', 'Portrait', 'Street'].map((highlight, index) => (
            <div key={index} className="flex flex-col items-center min-w-max">
              <div className="w-16 h-16 rounded-full bg-gray-200 p-0.5 mb-2">
                <img
                  src={`https://picsum.photos/100/100?random=${index + 20}`}
                  alt={highlight}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Navigation Tabs
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'posts', icon: Grid3X3, label: 'POSTS' },
    { id: 'reels', icon: Film, label: 'REELS' },
    { id: 'tagged', icon: User, label: 'TAGGED' },
  ];

  return (
    <div className="border-t border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-wider transition-colors ${isActive
                  ? 'text-black border-t-2 border-black'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Posts Grid
const PostsGrid = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="grid grid-cols-3 gap-1">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="aspect-square relative group cursor-pointer"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />
            {hoveredPost === post.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="flex items-center gap-4 text-white font-semibold">
                  <div className="flex items-center gap-1">
                    <Heart size={20} fill="white" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={20} fill="white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reels Grid
const ReelsGrid = () => {
  const [hoveredReel, setHoveredReel] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="grid grid-cols-3 gap-1">
        {mockReels.map((reel) => (
          <div
            key={reel.id}
            className="aspect-[4/5] relative group cursor-pointer"
            onMouseEnter={() => setHoveredReel(reel.id)}
            onMouseLeave={() => setHoveredReel(null)}
          >
            <img
              src={reel.image}
              alt={`Reel ${reel.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Play size={20} fill="white" className="text-white" />
            </div>
            {hoveredReel === reel.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white font-semibold flex items-center gap-1">
                  <Play size={20} fill="white" />
                  <span>{reel.views}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Tagged Grid
const TaggedGrid = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="grid grid-cols-3 gap-1">
        {mockTagged.map((post) => (
          <div
            key={post.id}
            className="aspect-square relative group cursor-pointer"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <img
              src={post.image}
              alt={`Tagged ${post.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <User size={20} className="text-white drop-shadow-lg" />
            </div>
            {hoveredPost === post.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="flex items-center gap-4 text-white font-semibold">
                  <div className="flex items-center gap-1">
                    <Heart size={20} fill="white" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={20} fill="white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsGrid />;
      case 'reels':
        return <ReelsGrid />;
      case 'tagged':
        return <TaggedGrid />;
      default:
        return <PostsGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ProfileHeader />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default App;