import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SurahList } from './components/SurahList';
import { VerseReader } from './components/VerseReader';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressStats } from './components/ProgressStats';
import { SettingsModal } from './components/SettingsModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { NotificationSettings } from './components/NotificationSettings';
import { PrayerTimes } from './components/PrayerTimes';
import { EnhancedPrayerCounter } from './components/EnhancedPrayerCounter';
import { AdhanNotification } from './components/AdhanNotification';
import { MemorialPrayers } from './components/MemorialPrayers';
import { DhikrCounter } from './components/DhikrCounter';
import { IslamicCalendar } from './components/IslamicCalendar';
import { MosqueFinder } from './components/MosqueFinder';
import { CharitySection } from './components/CharitySection';
import { useQuranReader } from './hooks/useQuranReader';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { usePWA } from './hooks/usePWA';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import { sampleSurahs, Surah } from './data/quran';
import { PrayerTime } from './data/prayer';

function App() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quran' | 'prayer' | 'memorial' | 'dhikr' | 'calendar' | 'mosques' | 'charity'>('dashboard');
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTime | null>(null);
  const [showAdhan, setShowAdhan] = useState(false);
  const [adhanPrayer, setAdhanPrayer] = useState<PrayerTime | null>(null);

  const {
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
  } = useQuranReader();

  const {
    audioState,
    audioRef,
    playPause,
    seekTo,
    setVolume,
    changeReciter
  } = useAudioPlayer();

  const {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    scheduleNotification
  } = usePWA();

  const { nextPrayer, timeToNext } = usePrayerTimes();

  // Show install prompt after 30 seconds if installable and not installed
  React.useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  // Check for prayer time and show adhan
  React.useEffect(() => {
    if (nextPrayer && timeToNext === '0:00') {
      setAdhanPrayer(nextPrayer);
      setShowAdhan(true);
    }
  }, [nextPrayer, timeToNext]);

  const handleSurahSelect = (surah: Surah) => {
    setSelectedSurah(surah);
    updateReadingPosition(surah.number, 1);
  };

  const handleVerseRead = (verseNumber: number) => {
    if (selectedSurah) {
      updateReadingPosition(selectedSurah.number, verseNumber);
    }
  };

  const handlePlayVerse = (verseNumber: number) => {
    playPause();
  };

  const handleInstallApp = () => {
    installApp();
    setShowInstallPrompt(false);
  };

  const handlePrayerSelect = (prayer: PrayerTime) => {
    setSelectedPrayer(prayer);
  };

  const handleAdhanDismiss = () => {
    setShowAdhan(false);
    setAdhanPrayer(null);
  };

  const handleAdhanSnooze = () => {
    setShowAdhan(false);
    // Schedule reminder after 5 minutes
    setTimeout(() => {
      if (adhanPrayer) {
        setShowAdhan(true);
      }
    }, 5 * 60 * 1000);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as any);
  };

  const tabs = [
    { key: 'dashboard', label: 'الرئيسية', icon: '🏠' },
    { key: 'quran', label: 'القرآن الكريم', icon: '📖' },
    { key: 'prayer', label: 'الصلاة والأذان', icon: '🕌' },
    { key: 'memorial', label: 'الورد والأدعية', icon: '🤲' },
    { key: 'dhikr', label: 'التسبيح والأذكار', icon: '📿' },
    { key: 'calendar', label: 'التقويم الإسلامي', icon: '📅' },
    { key: 'mosques', label: 'دليل المساجد', icon: '🕌' },
    { key: 'charity', label: 'الصدقة والزكاة', icon: '💝' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setShowSettings(true)}
        onOpenSearch={() => setShowSearch(true)}
      />

      <OfflineIndicator isOnline={isOnline} isDarkMode={isDarkMode} />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 p-2 rounded-xl ${
          isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
        } backdrop-blur-sm border ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-2 rounded-lg transition-all duration-200 text-center ${
                activeTab === tab.key
                  ? isDarkMode
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-emerald-600 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-slate-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="text-lg mb-1">{tab.icon}</div>
              <span className="font-medium text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {activeTab === 'dashboard' ? (
          <Dashboard isDarkMode={isDarkMode} onNavigate={handleNavigate} />
        ) : activeTab === 'quran' ? (
          <>
            <ProgressStats
              isDarkMode={isDarkMode}
              completedSurahs={readingProgress.completedSurahs.size}
              totalSurahs={sampleSurahs.length}
              readingStreak={readingProgress.readingStreak}
              currentPosition={{
                surah: readingProgress.currentSurah,
                verse: readingProgress.currentVerse
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Surah List */}
              <div className="lg:col-span-1">
                <div className={`sticky top-24 p-6 rounded-2xl ${
                  isDarkMode ? 'bg-slate-800/30' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  isDarkMode ? 'border-slate-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    سور القرآن الكريم
                  </h2>
                  <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
                    <SurahList
                      surahs={sampleSurahs}
                      isDarkMode={isDarkMode}
                      completedSurahs={readingProgress.completedSurahs}
                      currentSurah={selectedSurah?.number || readingProgress.currentSurah}
                      onSelectSurah={handleSurahSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Verse Reader */}
              <div className="lg:col-span-2">
                {selectedSurah ? (
                  <VerseReader
                    surah={selectedSurah}
                    isDarkMode={isDarkMode}
                    fontSize={fontSize}
                    showTranslation={showTranslation}
                    showTransliteration={showTransliteration}
                    bookmarkedVerses={readingProgress.bookmarkedVerses}
                    isPlaying={audioState.isPlaying}
                    currentPlayingVerse={audioState.currentVerse}
                    onToggleBookmark={toggleBookmark}
                    onPlayVerse={handlePlayVerse}
                    onVerseRead={handleVerseRead}
                  />
                ) : (
                  <div className={`text-center p-12 rounded-2xl ${
                    isDarkMode ? 'bg-slate-800/30' : 'bg-white/70'
                  } backdrop-blur-sm border ${
                    isDarkMode ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <div className={`mb-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className={`text-xl font-medium mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      اختر سورة للقراءة
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Select a Surah from the list to start reading
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : activeTab === 'prayer' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prayer Times */}
            <div>
              <PrayerTimes
                isDarkMode={isDarkMode}
                onPrayerSelect={handlePrayerSelect}
              />
            </div>
            
            {/* Prayer Instructions */}
            <div className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-slate-800/30' : 'bg-white/70'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                عداد الصلاة الذكي
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ✨ مميزات جديدة
                  </h4>
                  <ul className={`text-sm space-y-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <li>• عداد ذكي للركعات والسجدات</li>
                    <li>• واجهة محسنة وأوضح</li>
                    <li>• تعليمات مفصلة للاستخدام</li>
                    <li>• تنبيهات صوتية واهتزاز</li>
                  </ul>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <h4 className={`font-bold mb-2 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}>
                    كيفية الاستخدام
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    اختر الصلاة من القائمة أعلاه وسيظهر لك دليل مفصل للاستخدام
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'memorial' ? (
          <MemorialPrayers isDarkMode={isDarkMode} />
        ) : activeTab === 'dhikr' ? (
          <DhikrCounter isDarkMode={isDarkMode} />
        ) : activeTab === 'calendar' ? (
          <IslamicCalendar isDarkMode={isDarkMode} />
        ) : activeTab === 'mosques' ? (
          <MosqueFinder isDarkMode={isDarkMode} />
        ) : activeTab === 'charity' ? (
          <CharitySection isDarkMode={isDarkMode} />
        ) : null}
      </main>

      <AudioPlayer
        isDarkMode={isDarkMode}
        isPlaying={audioState.isPlaying}
        currentTime={audioState.currentTime}
        duration={audioState.duration}
        volume={audioState.volume}
        currentReciter={audioState.currentReciter}
        onPlayPause={playPause}
        onSeek={seekTo}
        onVolumeChange={setVolume}
        onReciterChange={changeReciter}
      />

      <SettingsModal
        isOpen={showSettings}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        showTranslation={showTranslation}
        showTransliteration={showTransliteration}
        onClose={() => setShowSettings(false)}
        onFontSizeChange={setFontSize}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        onToggleTransliteration={() => setShowTransliteration(!showTransliteration)}
        extraContent={
          <NotificationSettings
            isDarkMode={isDarkMode}
            onScheduleReminder={scheduleNotification}
          />
        }
      />

      <PWAInstallPrompt
        isVisible={showInstallPrompt && !isInstalled}
        isDarkMode={isDarkMode}
        onInstall={handleInstallApp}
        onDismiss={() => setShowInstallPrompt(false)}
      />

      {/* Enhanced Prayer Counter Modal */}
      {selectedPrayer && (
        <EnhancedPrayerCounter
          prayer={selectedPrayer}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedPrayer(null)}
        />
      )}

      {/* Adhan Notification */}
      {showAdhan && adhanPrayer && (
        <AdhanNotification
          prayerName={adhanPrayer.arabicName}
          prayerTime={adhanPrayer.time}
          isDarkMode={isDarkMode}
          onDismiss={handleAdhanDismiss}
          onSnooze={handleAdhanSnooze}
        />
      )}

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} />
    </div>
  );
}

export default App;