export default {
  /**
   * Game name
   * @type {String|null}
   */
  name: null,

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
   * @type {Array}
   */
  tags: [],

  /**
   * Game's release date
   * @type {Date|null}
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
