// --- for webpack aliases
declare module 'layouts/*'
declare module 'components/*'
declare module '@/*'

// --- quasar
declare module 'quasar' {
  export function openURL(url: string): void
  export const format: any
}

// --- interfaces
declare module 'interfaces' {
  export interface User {
    name: string
    url: string
    logo?: string | null
    reviews?: string
  }

  export interface SystemRequirements {
    OS: string
    CPU: string
    RAM: string
    GPU: string
    diskSpace: string
  }

  export interface LanguagesSupport {
    audio: Array<string>
    text: Array<string>
  }

  export interface Requirements {
    languages: LanguagesSupport
    rating: string
    systems: {
      apple?: {
        minimal: SystemRequirements
        recommended: SystemRequirements
      }
      windows?: {
        minimal: SystemRequirements
        recommended: SystemRequirements
      }
      linux?: {
        minimal: SystemRequirements
        recommended: SystemRequirements
      }
    }
  }

  export interface Game {
    name: string
    preview: string
    url?: string
    title?: string
    rating?: number
    price?: number
    description?: string
    platforms?: Array<string>
    tags?: Array<string>
    users?: User[],
    releaseDate?: string | Date
    developer?: string
    publisher?: string
    requirements?: Requirements
  }

  export interface Social {
    icon: string
    url?: string | undefined
    map?: Function
  }
}
