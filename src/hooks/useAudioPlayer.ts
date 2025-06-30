import { useState, useRef, useEffect } from 'react';

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentReciter: string;
  currentSurah: number;
  currentVerse: number;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    currentReciter: 'mishary',
    currentSurah: 1,
    currentVerse: 1
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      // Auto-play next verse logic could go here
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const playPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioState.isPlaying) {
      audio.pause();
    } else {
      // In a real app, you'd set the audio source based on reciter and surah/verse
      // audio.src = `https://audio-api.com/${audioState.currentReciter}/${audioState.currentSurah}.mp3`;
      audio.play().catch(console.error);
    }
    
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  };

  const setVolume = (volume: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      setAudioState(prev => ({ ...prev, volume }));
    }
  };

  const changeReciter = (reciterId: string) => {
    setAudioState(prev => ({ ...prev, currentReciter: reciterId }));
    // In a real app, you'd reload the audio with the new reciter
  };

  return {
    audioState,
    audioRef,
    playPause,
    seekTo,
    setVolume,
    changeReciter
  };
};