import urls from '@/config/urls'

export const resizeImage = (
  imageUrl?: string | null,
  width: string = "original"
): string => `${urls.img}/${width}${imageUrl}`;