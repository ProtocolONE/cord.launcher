export const initial = {
  logo: null,
  locale: 'en-us'
}

export const game = {
  name: 'Shattered Planet',
  info: {
    banner: 'statics/game/game-banner.jpg',
    title: 'Explore a dangerous planet that\'s different every time and try to survive!',
    description: 'The Galactic Union\'s job for you is clear: research the alien wildlife — for science! However, in this case, researching may include lasers, explosions, hungry aliens, space sushi, and other similarly delicious-or-terrifying hazards. In-between missions, use scrap metal you\'ve collected to upgrade your stats. Read more',
    bannerUrl: 'javascript:void(0)',
    readMoreUrl: 'javascript:void(0)'
  },
  developer: 'Kitfoxgames',
  publisher: 'Kitfoxgames',
  rating: 5,
  tags: ['STRATEGY', 'SCI-FI', 'ISOMETRIC'],
  likeTags: [
    { icon: 'rocket', label: 'SOME KIND OF TAG' },
    { icon: 'revolver', label: 'ANOTHER ONE' }
  ],
  followTags: ['STRATEGY', 'SCI-FI', 'ISOMETRIC'],
  friends: [
    {
      name: 'Anton Frolov',
      logo: 'statics/game/user-logo.jpg',
      url: 'javascript:void(0)'
    },
    {
      name: 'Petr Petrovich',
      logo: null,
      url: 'javascript:void(0)' }
  ],
  bestReview: {
    label: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
    user: {
      name: 'SexyKitten_666',
      logo: null,
      url: 'javascript:void(0)',
      reviews: 800
    }
  },
  releaseDate: 1549531304775,
  availablePlatforms: {
    linux: false,
    apple: true,
    windows: true
  },
  recommended: 3272,
  price: 99.99
}

export default {
  initial,
  game
}
