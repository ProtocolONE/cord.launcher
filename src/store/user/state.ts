import { UserPersonal } from 'interfaces'

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

export default {
  personal
}
