import { useState, useEffect } from 'react';
import { Surah } from '../data/quran';

interface ReadingProgress {
  currentSurah: number;
  currentVerse: number;
  completedSurahs: Set<number>;
  bookmarkedVerses: Set<string>;
  readingStreak: number;
  lastReadDate: string;
}

export const useQuranReader = () => {
  const [readingProgress, setReadingProgress] = useState<ReadingProgress>({
    currentSurah: 1,
    currentVerse: 1,
    completedSurahs: new Set(),
    bookmarkedVerses: new Set(),
    readingStreak: 0,
    lastReadDate: ''
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quranProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setReadingProgress({
        ...progress,
        completedSurahs: new Set(progress.completedSurahs),
        bookmarkedVerses: new Set(progress.bookmarkedVerses)
      });
    }

    const theme = localStorage.getItem('quranTheme');
    if (theme) {
      setIsDarkMode(theme === 'dark');
    }
  }, []);

  const saveProgress = (progress: ReadingProgress) => {
    const toSave = {
      ...progress,
      completedSurahs: Array.from(progress.completedSurahs),
      bookmarkedVerses: Array.from(progress.bookmarkedVerses)
    };
    localStorage.setItem('quranProgress', JSON.stringify(toSave));
    setReadingProgress(progress);
  };

  const updateReadingPosition = (surahNumber: number, verseNumber: number) => {
    const today = new Date().toDateString();
    const streak = readingProgress.lastReadDate === today ? 
      readingProgress.readingStreak : 
      readingProgress.readingStreak + 1;

    const newProgress = {
      ...readingProgress,
      currentSurah: surahNumber,
      currentVerse: verseNumber,
      readingStreak: streak,
      lastReadDate: today
    };
    saveProgress(newProgress);
  };

  const toggleBookmark = (surahNumber: number, verseNumber: number) => {
    const verseKey = `${surahNumber}:${verseNumber}`;
    const newBookmarks = new Set(readingProgress.bookmarkedVerses);
    
    if (newBookmarks.has(verseKey)) {
      newBookmarks.delete(verseKey);
    } else {
      newBookmarks.add(verseKey);
    }

    const newProgress = {
      ...readingProgress,
      bookmarkedVerses: newBookmarks
    };
    saveProgress(newProgress);
  };

  const markSurahComplete = (surahNumber: number) => {
    const newCompleted = new Set(readingProgress.completedSurahs);
    newCompleted.add(surahNumber);
    
    const newProgress = {
      ...readingProgress,
      completedSurahs: newCompleted
    };
    saveProgress(newProgress);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('quranTheme', newTheme ? 'dark' : 'light');
  };

  return {
    readingProgress,
    isDarkMode,
    fontSize,
    showTranslation,
    showTransliteration,
    setFontSize,
    setShowTranslation,
    setShowTransliteration,
    updateReadingPosition,
    toggleBookmark,
    markSurahComplete,
    toggleTheme
  };
};