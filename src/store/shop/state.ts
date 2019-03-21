import { Game } from 'interfaces'

const games: Game[] = [
  { name: 'Game-1', preview: 'statics/images/forza.jpg', url: '/game/1' },
  { name: 'Game-2', preview: 'statics/images/forza.jpg', url: '/game/2' },
  { name: 'Game-3', preview: 'statics/images/forza.jpg', url: '/game/3' },
  { name: 'Game-4', preview: 'statics/images/forza.jpg', url: '/game/4' }
]

const specialOffer: Game = {
  name: 'Battlefield V',
  url: '/game/5',
  rating: 5,
  price: 99.99,
  preview: 'statics/images/special-offer.jpg'
}

const popularGames: Game[] = [
  {
    name: 'Game 1',
    title: 'Game title',
    description: 'Place for additional text for terms, Additional text might be even here.',
    url: '/game/1',
    rating: 4.5,
    price: 99.99,
    preview: 'statics/images/slide-1.jpg',
    platforms: ['windows', 'apple', 'linux'],
    tags: ['strategy', 'sci-fi', 'isometric'],
    users: [
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      },
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      },
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      }
    ]
  },
  {
    name: 'Game 2',
    title: 'Game title',
    description: 'Place for additional text for terms, Additional text might be even here.',
    url: '/game/2',
    rating: 4.5,
    price: 99.99,
    preview: 'statics/images/slide-2.jpg',
    platforms: ['windows', 'apple', 'linux'],
    tags: ['strategy', 'sci-fi', 'isometric'],
    users: [
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      },
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      },
      {
        name: 'Anton Frolov',
        logo: 'statics/images/user-logo.jpg',
        url: '/user/1'
      }
    ]
  }
]

export default {
  games,
  specialOffer,
  popularGames
}
