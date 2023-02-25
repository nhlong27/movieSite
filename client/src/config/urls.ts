const tmdb = 'https://api.themoviedb.org/3';
const embed = "https://www.2embed.to/embed/tmdb";
const img = "https://image.tmdb.org/t/p";
const yt_img = (key?: string) => `https://img.youtube.com/vi/${key}/0.jpg`;
const yt = 'https://www.youtube.com/watch?v='
const server = import.meta.env.VITE_SERVER;


export default {tmdb, embed, img, yt_img, yt, server}; 