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
  // --- base
  export interface BaseSelectOption {
    label: string
    value: string
  }

  // --- pages
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
    users?: GameUser[],
    releaseDate?: string | Date
    developer?: string
    publisher?: string
    requirements?: GameRequirements
  }

  export interface GameUser {
    name: string
    url: string
    logo?: string | null
    reviews?: string
  }

  export interface GameRequirements {
    languages: LanguagesSupport
    rating: string
    systems: Systems
  }

  export interface LanguagesSupport {
    audio: Array<string>
    text: Array<string>
  }

  export interface Systems {
    apple?: {
      minimal: Requirements
      recommended: Requirements
    }
    windows?: {
      minimal: Requirements
      recommended: Requirements
    }
    linux?: {
      minimal: Requirements
      recommended: Requirements
    }
  }

  export interface Requirements {
    OS: string
    CPU: string
    RAM: string
    GPU: string
    diskSpace: string
  }

  export interface Social {
    icon: string
    url?: string | undefined
    map?: Function
  }

  export interface UserPersonal {
    name: string
    lastName: string
    dateBirth: UserPersonalDateBirth
    address: UserPersonalAddress
  }

  export interface UserPersonalDateBirth {
    day: string | number
    month: string | number
    year: string | number
  }

  export interface UserPersonalAddress {
    country: string
    city: string
    region: string
    postalCode: string | number
    addressLine1?: string
    addressLine2?: string
  }

  export interface UserAccount {
    name: string
    primaryLanguage?: string
    additionalLanguages?: Array<string>
    linkedAccounts?: UserLinkedAccount[]
  }

  export interface UserLinkedAccount {
    icon: string
    label: string
  }

  export interface UserSecurity {

  }

  export interface UserPayments {
    methods: UserPaymentMethod[]
    orders: UserOrder[]
  }

  export interface UserPaymentMethod {
    card: string
  }

  export interface UserOrder {
    name: string
    date: string | Date
    type: string
    games: Game[]
  }
}
