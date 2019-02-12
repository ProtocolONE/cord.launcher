export const initial = {
  logo: null,
  locale: 'en-us'
}

export const game = {
  name: 'Shattered Planet',
  preview: 'statics/game/game-preview.jpg',
  info: {
    banner: 'statics/game/game-banner.jpg',
    title: 'Explore a dangerous planet that\'s different every time and try to survive!',
    description: 'The Galactic Union\'s job for you is clear: research the alien wildlife — for science! However, in this case, researching may include lasers, explosions, hungry aliens, space sushi, and other similarly delicious-or-terrifying hazards. In-between missions, use scrap metal you\'ve collected to upgrade your stats. Read more',
    bannerUrl: 'javascript:void(0)',
    readMoreUrl: 'javascript:void(0)'
  },
  developer: 'Kitfoxgames',
  publisher: 'Kitfoxgames',
  rating: 4,
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
      url: 'javascript:void(0)'
    }
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
  price: 99.99,
  followSocial: [
    { icon: 'facebook', url: 'javascript:void(0)' },
    { icon: 'instagram', url: 'javascript:void(0)' },
    { icon: 'twitter', url: 'javascript:void(0)' },
    { icon: 'youtube', url: 'javascript:void(0)' },
    { icon: 'ok', url: 'javascript:void(0)' },
    { icon: 'vk', url: 'javascript:void(0)' },
    { icon: 'facebook-messenger', url: 'javascript:void(0)' }
  ],
  gamesMore: [
    { name: 'Forza', preview: 'statics/game/game-forza.jpg', url: '/' },
    { name: 'Deer', preview: 'statics/game/game-deer.jpg', url: '/' },
    { name: 'Forza', preview: 'statics/game/game-forza.jpg', url: '/' },
    { name: 'Deer', preview: 'statics/game/game-deer.jpg', url: '/' }
  ],
  gamesLikes: [
    { name: 'Forza', preview: 'statics/game/game-forza.jpg', url: '/' },
    { name: 'Deer', preview: 'statics/game/game-deer.jpg', url: '/' },
    { name: 'Forza', preview: 'statics/game/game-forza.jpg', url: '/' },
    { name: 'Deer', preview: 'statics/game/game-deer.jpg', url: '/' }
  ],
  gameRating: {
    overall: 3.8,
    owners: 4.3
  },
  reviews: [
    {
      review: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
      rating: 3,
      user: {
        name: 'Anton Frolov',
        logo: 'statics/game/user-logo.jpg',
        url: 'javascript:void(0)',
        reviews: 800
      }
    },
    {
      review: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
      rating: 3,
      user: {
        name: 'Petr Petrovich',
        logo: null,
        url: 'javascript:void(0)',
        reviews: 300
      }
    },
    {
      review: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
      rating: 3,
      user: {
        name: 'Anton Frolov',
        logo: 'statics/game/user-logo.jpg',
        url: 'javascript:void(0)',
        reviews: 13
      }
    }
  ]
}

export default {
  initial,
  game
}
