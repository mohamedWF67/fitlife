// A bundled mock image (require result) or a photo taken on the device.
export type PhotoSource = number | { uri: string };

export interface ProgressPhoto {
  id: string;
  time: string;
  source: PhotoSource;
}

export interface ProgressPhotoDay {
  date: string;
  photos: ProgressPhoto[];
}

export interface ProgressPhotoLog {
  days: ProgressPhotoDay[];
}
