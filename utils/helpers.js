/**
 * Helpers module
 */

const toLower = s => s.toLowerCase();
const toUpper = s => s.toUpperCase();

module.exports = {
  /**
   * Chance.js configuration factory.
   * Create options hash which returns a random boolean value with given likelihood of success.
   *
   * @param {Number} [likelihood=50] Likelihood of success
   * @returns {Object}
   */
  trustyWithGivenChance: (likelihood = 50) => ({
    type: 'boolean',
    chance: {
      bool: { likelihood },
    },
  }),

  /**
   * Creates array of given length and fills with data from passed in generator.
   *
   * @param {Number} length Length of array
   * @param {Function} generator Function which generates some data
   * @returns {Array}
   */
  generate: (length, generator) => new Array(...new Array(length)).map(generator),

  /**
   * Capitalize given string
   *
   * @param {String} string
   * @returns {String}
   */
  capitalize: string => string.toLowerCase().replace(/(\b\w)/g, toUpper),

  toLower,
  toUpper,
};
