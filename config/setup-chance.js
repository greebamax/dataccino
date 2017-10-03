const Chance = require('chance');
const chance = new Chance();
const { Helpers } = require('../utils');

module.exports = chance.mixin({
  /**
   * Generates a short email that is match the pattern `u.lastName@domain.com`
   *
   * @param {Object} options
   * @param {String} [options.domain=mocked.com] Domain name
   * @returns {String}
   */
  shortEmail: ({ domain } = {}) => {
    const firstLetter = chance.character({ alpha: true });
    const userName = `${firstLetter}.${chance.last()}`.toLowerCase();

    return `${userName}@${domain || 'mocked.com'}`;
  },

  currencyCode: () => chance.currency().code,

  /**
   * Generates custom formatted string
   *
   * @param {Object} options
   * @param {String} [options.separator=' '] Domain name
   * @param {String} options.format Format type: camel, constant, dot, kebab, snake, upper
   * @param {Number} [options.words] Length of title
   * @returns {String}
   */
  stringByFormat({ format, words, separator }) {
    const length = words || chance.natural({ min: 3, max: 5 });
    const wordsArray = chance.n(chance.word, length);

    if (!separator) {
      separator = { // eslint-disable-line no-param-reassign
        camel: '',
        constant: '_',
        dot: '.',
        kebab: '-',
        pascal: '',
        snake: '_',
        upper: ' ',
      }[format];
    }

    const formatter = {
      camel: Helpers.capitalize,
      constant: Helpers.toLower,
      dot: Helpers.toLower,
      kebab: Helpers.toLower,
      pascal: Helpers.capitalize,
      snake: Helpers.toLower,
      upper: Helpers.toUpper,
    }[format];

    const result = wordsArray.map(formatter).join(separator);

    switch (format) {
      case 'camel': {
        return result.replace(/^\w/, s => s.toLowerCase());
      }

      case 'constant':
      case 'dot':
      case 'kebab':
      case 'pascal':
      case 'upper':
      case 'snake':
      default: {
        return result;
      }
    }
  },

  /**
   * Works the same as `chance.sentence()` but generates sentence without dot at the end.
   *
   * @param {Object} options
   * @param {Number} [options.words=3] Length of sentence
   * @returns {String}
   */
  // eslint-disable-next-line no-unused-vars
  customSentence: ({ words } = { words: 3 }) => chance.sentence({ words: 3 }).slice(0, -1),
});
