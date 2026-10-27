import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useProgressPhotos, type CarouselPhoto } from '../models/useProgressPhotos';
import { parseDate } from '../../domain/workoutUtils';

export default function ProgressPhotoCarousel() {
  const { photos, error, removePhoto, takePhoto } = useProgressPhotos();
  const listRef = useRef<FlatList<CarouselPhoto>>(null);
  const previousCount = useRef(photos.length);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  // Clamp after a delete removes the last photo.
  const shown = Math.min(index, photos.length - 1);
  const current = photos[shown];

  useEffect(() => {
    // A new photo is always today's, so it lands at the end: scroll to it.
    if (photos.length > previousCount.current) listRef.current?.scrollToEnd({ animated: true });
    previousCount.current = photos.length;
  }, [photos.length]);

  return (
    <View className="p-5 gap-3 rounded-3xl bg-[#26263b]">
      <View>
        <Text className="text-white text-2xl font-bold">Progress Photos</Text>
        <Text className="text-gray-500 font-semibold">{"See how far you've come"}</Text>
      </View>

      {photos.length === 0 ? <View className="gap-1 rounded-2xl bg-[#303049] p-4">
        <Text className="text-white font-bold">No progress photos yet.</Text>
        <Text className="text-gray-300">Take your first one to start tracking your progress.</Text>
      </View> : <>
        <View className="overflow-hidden rounded-2xl bg-[#303049]" onLayout={e => setWidth(e.nativeEvent.layout.width)}>
          {width > 0 && <FlatList ref={listRef} data={photos} keyExtractor={photo => photo.id}
            horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16}
            onScroll={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
            getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
            renderItem={({ item }) => <Image source={item.source} contentFit="cover"
              accessibilityLabel={`Progress photo from ${item.date} at ${item.time}`}
              style={{ width, aspectRatio: 3 / 4 }} />} />}
        </View>
        {current && <View className="flex-row items-center justify-between">
          <Text className="text-white font-bold">
            {parseDate(current.date)?.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {current.time}
          </Text>
          <Text className="text-gray-500">{shown + 1} / {photos.length}</Text>
        </View>}
        <View className="flex-row justify-center gap-1.5">
          {photos.map((photo, dotIndex) => <View key={photo.id}
            className={`h-1.5 rounded-full ${dotIndex === shown ? 'w-4 bg-[#5438be]' : 'w-1.5 bg-[#303049]'}`} />)}
        </View>
      </>}

      {!!error && <Text accessibilityRole="alert" className="text-red-400">{error}</Text>}
      <View className="flex-row gap-3">
        <Pressable accessibilityRole="button" disabled={!current} onPress={() => current && removePhoto(current.id)}
          className={`flex-1 rounded-2xl p-4 bg-[#303049] active:opacity-50 ${current ? '' : 'opacity-50'}`}>
          <Text className="text-white font-bold text-center">Delete photo</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={takePhoto}
          className="flex-1 rounded-2xl p-4 bg-[#5438be] active:opacity-50">
          <Text className="text-white font-bold text-center">Take photo</Text>
        </Pressable>
      </View>
    </View>
  );
}
