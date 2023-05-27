const tmdb = 'https://api.themoviedb.org/3';
const img = 'https://image.tmdb.org/t/p';
const yt_img = (key?: string) => `https://img.youtube.com/vi/${key}/0.jpg`;
const yt = 'https://www.youtube.com/watch?v=';
const server = process.env.NEXT_PUBLIC_SERVER;
// main. https://www.2embed.to/embed/tmdb/tv?id=100088&s=1&e=2
const embed = 'https://www.2embed.to/embed/tmdb';
//backups
// https://2embed.org/embed/tv?tmdb=299534&s=1&e=2
const embed2 = 'https://2embed.org/embed';
// https://v2.vidsrc.me/embed/100088/1-2
const embed3 = 'https://v2.vidsrc.me/embed';

export default { tmdb, embed, img, yt_img, yt, server, embed2, embed3 };
