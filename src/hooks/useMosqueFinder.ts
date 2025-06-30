import { useState, useEffect } from 'react';
import { Mosque, sampleMosques } from '../data/mosques';

export const useMosqueFinder = () => {
  const [nearbyMosques, setNearbyMosques] = useState<Mosque[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          findNearbyMosques(location);
        },
        (error) => {
          console.log('Location access denied');
          // استخدام موقع افتراضي (الرياض)
          const defaultLocation = { lat: 24.7136, lng: 46.6753 };
          setUserLocation(defaultLocation);
          findNearbyMosques(defaultLocation);
        }
      );
    }
    
    setLoading(false);
  };

  const findNearbyMosques = (location: {lat: number, lng: number}) => {
    // حساب المسافة لكل مسجد
    const mosquesWithDistance = sampleMosques.map(mosque => {
      const distance = calculateDistance(
        location.lat, location.lng,
        mosque.latitude, mosque.longitude
      );
      
      return { ...mosque, distance };
    });

    // ترتيب حسب المسافة
    mosquesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    
    setNearbyMosques(mosquesWithDistance);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDirections = (mosque: Mosque) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${mosque.latitude},${mosque.longitude}`;
      window.open(url, '_blank');
    }
  };

  const addReview = (mosqueId: string, review: {rating: number, comment: string}) => {
    setNearbyMosques(prev => 
      prev.map(mosque => 
        mosque.id === mosqueId 
          ? {
              ...mosque,
              reviews: [...mosque.reviews, {
                id: Date.now().toString(),
                userName: 'مستخدم',
                rating: review.rating,
                comment: review.comment,
                date: new Date().toISOString().split('T')[0]
              }]
            }
          : mosque
      )
    );
  };

  return {
    nearbyMosques,
    userLocation,
    loading,
    getDirections,
    addReview,
    refreshLocation: getCurrentLocation
  };
};