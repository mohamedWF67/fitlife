import type { ProgressPhotoLog } from '../../domain/entities/ProgressPhoto';

export const ProgressPhotos: ProgressPhotoLog = {
  days: [
    {
      date: '2026-10-20',
      photos: [
        { id: 'p1', time: '07:30', source: require('./progressPhotos/progress-2026-10-20-front.jpg') },
        { id: 'p2', time: '07:32', source: require('./progressPhotos/progress-2026-10-20-side.jpg') },
      ],
    },
    {
      date: '2026-10-24',
      photos: [
        { id: 'p3', time: '08:10', source: require('./progressPhotos/progress-2026-10-24-front.jpg') },
      ],
    },
    {
      date: '2026-10-27',
      photos: [
        { id: 'p4', time: '07:45', source: require('./progressPhotos/progress-2026-10-27-front.jpg') },
        { id: 'p5', time: '07:47', source: require('./progressPhotos/progress-2026-10-27-side.jpg') },
      ],
    },
  ],
};
