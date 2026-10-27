import { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ActionButton, Card, Message, ui } from './WorkoutUI';
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
    <Card>
      <Text className={ui.badge}>PROGRESS PHOTOS</Text>
      <Text className={ui.heading}>{"See how far you've come"}</Text>

      {photos.length === 0 ? <View className={ui.inset}>
        <Text className={ui.label}>No progress photos yet.</Text>
        <Text className={ui.caption}>Take your first one to start tracking your progress.</Text>
      </View> : <>
        <View className="overflow-hidden rounded-2xl" onLayout={e => setWidth(e.nativeEvent.layout.width)}>
          {width > 0 && <FlatList ref={listRef} data={photos} keyExtractor={photo => photo.id}
            horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16}
            onScroll={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
            getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
            renderItem={({ item }) => <Image source={item.source} contentFit="cover"
              accessibilityLabel={`Progress photo from ${item.date} at ${item.time}`}
              style={{ width, aspectRatio: 3 / 4 }} />} />}
        </View>
        {current && <View className={ui.between}>
          <Text className={ui.label}>
            {parseDate(current.date)?.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {current.time}
          </Text>
          <Text className={ui.caption}>{shown + 1} / {photos.length}</Text>
        </View>}
        <View className="flex-row justify-center gap-1.5">
          {photos.map((photo, dotIndex) => <View key={photo.id}
            className={`h-1.5 rounded-full ${dotIndex === shown ? 'w-4 bg-blue-400' : 'w-1.5 bg-slate-700'}`} />)}
        </View>
      </>}

      {!!error && <Message error>{error}</Message>}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <ActionButton secondary label="Delete photo" disabled={!current} onPress={() => current && removePhoto(current.id)} />
        </View>
        <View className="flex-1">
          <ActionButton label="Take photo" onPress={takePhoto} />
        </View>
      </View>
    </Card>
  );
}
