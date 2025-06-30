import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat } from 'lucide-react';
import { reciters } from '../data/quran';

interface AudioPlayerProps {
  isDarkMode: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentReciter: string;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onReciterChange: (reciterId: string) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isDarkMode,
  isPlaying,
  currentTime,
  duration,
  volume,
  currentReciter,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onReciterChange
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 backdrop-blur-lg transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/95 border-slate-700' 
        : 'bg-white/95 border-gray-200'
    } border-t`}>
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className={`w-full h-2 rounded-full cursor-pointer ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
          }`}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percentage = (e.clientX - rect.left) / rect.width;
            onSeek(percentage * duration);
          }}>
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className={`flex justify-between text-xs mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Reciter Selection */}
          <div className="flex items-center space-x-3">
            <select
              value={currentReciter}
              onChange={(e) => onReciterChange(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-white border-slate-600' 
                  : 'bg-white text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
            >
              {reciters.map((reciter) => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </option>
              ))}
            </select>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onPlayPause}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <SkipForward className="w-5 h-5" />
            </button>

            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Volume2 className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};