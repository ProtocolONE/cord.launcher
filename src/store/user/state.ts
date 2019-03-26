import {
  UserPersonal,
  UserAccount,
  UserSecurity,
  UserPayments
} from 'interfaces'

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

const security: UserSecurity = {

}

const payments: UserPayments = {
  methods: [{ card: '1158 **** **** **62' }, { card: '1158 **** **** **62' }],
  orders: [
    {
      name: '#5C214234',
      date: '2 days ago',
      type: 'credit card',
      games: [
        { name: 'Game 1', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' }
      ]
    },
    {
      name: '#5C214235',
      date: '2 days ago',
      type: 'credit card',
      games: [
        { name: 'Game 1', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' },
        { name: 'Game 2', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' }
      ]
    },
    {
      name: '#5C214236',
      date: '2 days ago',
      type: 'credit card',
      games: [
        { name: 'Game 1', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' },
        { name: 'Game 2', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' },
        { name: 'Game 3', preview: 'statics/images/forza.jpg', price: 99.99, url: '/game/1' }
      ]
    }
  ]
}

export default {
  personal,
  account,
  security,
  payments
}
