export default {
  /**
   * Game name
   * @type {String|null}
   */
  name: null,

  /**
   * Game image preview url
   * @type {String|null}
   */
  preview: null,

  /**
   * Game info
   * @type {Object}
   */
  info: {
    banner: null,
    title: null,
    description: null,
    bannerUrl: null,
    readMoreUrl: null
  },

  /**
   * Game developer
   * @type {String|null}
   */
  developer: null,

  /**
   * Game publisher
   * @type {String|null}
   */
  publisher: null,

  /**
   * Game rating
   * @type {Number|String|null}
   */
  rating: null,

  /**
   * Game tags
   * @type {Array} String array
   * @example {String} 'tag-1' 'tag-2' ... 'tag-n'
   */
  tags: [],

  /**
   * Like game tags
   * @type {Array} Object array
   * @example {Object} { icon: <String>, label: <String> }
   */
  likeTags: [],

  /**
   * Friends also playing
   * @type {Array} Object array
   * @example {Object} { name: <String>, logo: <String>, url: <String> }
   */
  friends: [],

  /**
   * Best review from user
   * @type {Object} Review info
   */
  bestReview: {
    label: null,
    user: {
      name: null,
      logo: null,
      url: null,
      reviews: null
    }
  },

  /**
   * Follow game tags
   * @type {Array} Object array
   * @example {String} 'tag-1' 'tag-2' ... 'tag-n'
   */
  followTags: [],

  /**
   * Follow social links
   * @type {Array} social links
   * @example {Object} { icon: 'facebook', url: 'url' }
   */
  followSocial: [],

  /**
   * Game's release date
   * @type {String|Number|Date|null}
   */
  releaseDate: null,

  /**
   * Available platforms list
   * @type {Object}
   */
  availablePlatforms: {
    linux: false,
    apple: false,
    windows: false
    // --- other
  },

  /**
   * Users recommend
   * @type {Number|null}
   */
  recommended: null,

  /**
   * Game price
   * @type {Number|String|Null}
   */
  price: null
}
