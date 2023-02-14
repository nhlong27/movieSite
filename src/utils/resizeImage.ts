import urls from '@/config/urls'

export const resizeImage = (
  imageUrl: string,
  width: string = "original"
): string => `${urls.img}/${width}${imageUrl}`;