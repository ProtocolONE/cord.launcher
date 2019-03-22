import { UserPersonal, UserAccount } from 'interfaces'

const personal: UserPersonal = {
  name: 'Michael',
  lastName: 'Smith',
  dateBirth: {
    day: '14',
    month: 'November',
    year: '1987'
  },
  address: {
    country: 'Russian Federation',
    city: 'Saint-Petersburg',
    region: 'Saint-Petersburg',
    postalCode: '190068',
    addressLine1: 'Griboedov ch. emb. 119-121, 77'
  }
}

const account: UserAccount = {
  name: 'Mesqualito_1920',
  primaryLanguage: 'en-us',
  additionalLanguages: ['ru-ru'],
  linkedAccounts: [
    { icon: 'fab fa-twitter', label: 'Mesqualito' },
    { icon: 'fab fa-facebook-f', label: 'Mesqualito' }
  ]
}

export default {
  personal,
  account
}
