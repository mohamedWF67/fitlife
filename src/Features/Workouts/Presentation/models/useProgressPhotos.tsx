import { useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import type { ProgressPhoto, ProgressPhotoDay } from '../../domain/entities/ProgressPhoto';
import { ProgressPhotos } from '../../data/mock/ProgressPhotos';
import { dateKey } from '../../domain/workoutUtils';

export type CarouselPhoto = ProgressPhoto & { date: string };

export const useProgressPhotos = () => {
  const [days, setDays] = useState<ProgressPhotoDay[]>(ProgressPhotos.days);
  const [error, setError] = useState('');

  // One flat, date-ordered list for the carousel; days can hold several photos.
  const photos = useMemo<CarouselPhoto[]>(
    () => [...days]
      .sort((a, b) => a.date.localeCompare(b.date))
      .flatMap(day => day.photos.map(photo => ({ ...photo, date: day.date }))),
    [days]
  );

  const addPhoto = (uri: string) => {
    const now = new Date();
    const date = dateKey(now);
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const photo: ProgressPhoto = { id: Date.now().toString(), time, source: { uri } };
    setDays(prev => prev.some(day => day.date === date)
      ? prev.map(day => day.date === date ? { ...day, photos: [...day.photos, photo] } : day)
      : [...prev, { date, photos: [photo] }]);
  };

  const removePhoto = (id: string) => {
    setDays(prev => prev
      .map(day => ({ ...day, photos: day.photos.filter(photo => photo.id !== id) }))
      .filter(day => day.photos.length > 0));
  };

  // Returns true when a new photo was added.
  const takePhoto = async () => {
    setError('');
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) { setError('Allow camera access to take a progress photo.'); return false; }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: 'images', quality: 0.7 });
    if (result.canceled) return false;
    addPhoto(result.assets[0].uri);
    return true;
  };

  return { days, photos, error, addPhoto, removePhoto, takePhoto };
};
