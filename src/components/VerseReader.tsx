import React, { useState } from 'react';
import { Play, Pause, Bookmark, Share2, Copy, Volume2 } from 'lucide-react';
import { Surah, Verse } from '../data/quran';

interface VerseReaderProps {
  surah: Surah;
  isDarkMode: boolean;
  fontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  bookmarkedVerses: Set<string>;
  isPlaying: boolean;
  currentPlayingVerse?: number;
  onToggleBookmark: (surahNumber: number, verseNumber: number) => void;
  onPlayVerse: (verseNumber: number) => void;
  onVerseRead: (verseNumber: number) => void;
}

export const VerseReader: React.FC<VerseReaderProps> = ({
  surah,
  isDarkMode,
  fontSize,
  showTranslation,
  showTransliteration,
  bookmarkedVerses,
  isPlaying,
  currentPlayingVerse,
  onToggleBookmark,
  onPlayVerse,
  onVerseRead
}) => {
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);

  const handleVerseClick = (verseNumber: number) => {
    onVerseRead(verseNumber);
  };

  const copyVerse = (verse: Verse) => {
    const text = `${verse.arabic}\n\n${verse.translation}\n\n— ${surah.name} ${verse.number}`;
    navigator.clipboard.writeText(text);
  };

  const shareVerse = (verse: Verse) => {
    if (navigator.share) {
      navigator.share({
        title: `${surah.name} - Verse ${verse.number}`,
        text: `${verse.arabic}\n\n${verse.translation}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Surah Header */}
      <div className={`text-center p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
      } backdrop-blur-sm border ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`} dir="rtl">
          سورة {surah.name}
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {surah.englishName}
        </p>
        <div className={`flex items-center justify-center space-x-4 mt-3 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span>{surah.revelationType}</span>
          <span>•</span>
          <span>{surah.numberOfVerses} آية</span>
        </div>
      </div>

      {/* Verses */}
      <div className="space-y-4">
        {surah.verses.map((verse) => {
          const isBookmarked = bookmarkedVerses.has(`${surah.number}:${verse.number}`);
          const isCurrentlyPlaying = isPlaying && currentPlayingVerse === verse.number;
          const isHovered = hoveredVerse === verse.number;

          return (
            <div
              key={verse.number}
              className={`group p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                isCurrentlyPlaying
                  ? isDarkMode
                    ? 'bg-emerald-900/30 border-emerald-700 shadow-lg'
                    : 'bg-emerald-50 border-emerald-200 shadow-lg'
                  : isDarkMode
                    ? 'bg-slate-800/30 hover:bg-slate-800/50 border-slate-700/50'
                    : 'bg-white/70 hover:bg-white border-gray-200/50'
              } border backdrop-blur-sm`}
              onMouseEnter={() => setHoveredVerse(verse.number)}
              onMouseLeave={() => setHoveredVerse(null)}
              onClick={() => handleVerseClick(verse.number)}
            >
              {/* Verse Number and Actions */}
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  <span>آية</span>
                  <span>{verse.number}</span>
                </div>

                <div className={`flex items-center space-x-2 transition-opacity ${
                  isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayVerse(verse.number);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    title="Play verse"
                  >
                    {isCurrentlyPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(surah.number, verse.number);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 hover:text-amber-600'
                        : isDarkMode 
                          ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    title="Bookmark verse"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyVerse(verse);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    title="Copy verse"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareVerse(verse);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    title="Share verse"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <div 
                className={`text-right mb-4 leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontSize: fontSize + 4, lineHeight: '2.2' }}
                dir="rtl"
              >
                {verse.arabic}
              </div>

              {/* Transliteration */}
              {showTransliteration && (
                <div className={`mb-3 text-sm italic ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {verse.transliteration}
                </div>
              )}

              {/* Translation */}
              {showTranslation && (
                <div className={`text-base leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`} style={{ fontSize }}>
                  {verse.translation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};