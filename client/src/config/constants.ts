import {history, plan_to_watch, completed, favorite, all, dropped} from './icons'


export const listFilterPrompts: Record<string, Record<string, any>> = {
  Watching: {
    title: 'Currently Watching',
    image: history,
    text: ' This section is where you can track the movies you are currently in the process of watching. It allows you to easily resume your viewing from where you left off.'
  },
  "Plan to Watch": {
    title: 'Plan to Watch',
    text: `Here, you can compile a list of movies that you are interested in watching but haven't gotten around to yet. It serves as a reminder of the films you are excited to explore in the future.`,
    image: plan_to_watch
  },
  isFavorited: {
    title: 'Favorites',
    text: 'In this category, you can find all the movies that you have marked as your personal favorites. These are the films that you absolutely love and highly recommend to others.',
    image: favorite
  },
  Dropped: {
    title: 'Dropped',
    text: `In the "Dropped" category, you can keep track of movies that you started watching but decided to discontinue for various reasons.`,
    image: dropped
  },
  Completed: {
    title: 'Completed',
    text: ` In this section, you can find a comprehensive list of all the movies you have successfully watched from start to finish. It's a great way to keep a record of the movies you have enjoyed and completed.`,
    image: completed
  },
  All: {
    title: 'All Media',
    text: 'This section encompasses your entire movie collection. It includes all the movies you have marked as favorites, plan to watch, currently watching, completed, or dropped.',
    image: all
  },
}