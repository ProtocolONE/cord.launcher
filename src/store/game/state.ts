import { format } from 'quasar'
import { Game, Social } from 'interfaces'

const { capitalize } = format

const game: Game = {
  name: 'Shattered Planet',
  preview: 'statics/images/game-preview.jpg',
  rating: 4.5,
  price: 99.99,
  tags: ['strategy', 'sci-fi', 'isometric'],
  platforms: ['windows', 'apple'],
  releaseDate: 'Released on Dec 16, 2018',
  developer: 'Kitfoxgames',
  publisher: 'Kitfoxgames',
  requirements: {
    languages: {
      audio: ['English', 'Deutsch', 'italiano'],
      text: ['English', 'Русский', 'Deutsch', 'Español', 'Français', 'italiano', '中文(简体)']
    },
    systems: {
      apple: getSystemRequirements('apple'),
      windows: getSystemRequirements('windows'),
      linux: getSystemRequirements('linux')
    },
    rating: 'statics/images/game-rating.jpg'
  }
}

const socials: Social[] = [
  { icon: 'facebook-f' },
  { icon: 'instagram' },
  { icon: 'twitter' },
  { icon: 'youtube' },
  { icon: 'odnoklassniki' },
  { icon: 'vk' },
  { icon: 'facebook-messenger' }
]

function getSystemRequirements (os: string) {
  return {
    minimal: {
      OS: capitalize(os),
      CPU: 'Quad core, 2.0 HHz',
      RAM: '4 Gb',
      GPU: '1 Gb RAM, Open GL 3.0',
      diskSpace: '60 Gb'
    },
    recommended: {
      OS: capitalize(os),
      CPU: 'Quad core, 3.0 HHz',
      RAM: '8 Gb',
      GPU: '2 Gb RAM, Open GL 3.0',
      diskSpace: '60 Gb'
    }
  }
}

export default {
  game,
  socials
}
