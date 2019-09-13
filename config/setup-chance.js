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
    const FORMAT = {
      CAMEL: 'CAMEL',
      CONSTANT: 'CONSTANT',
      DOT: 'DOT',
      KEBAB: 'KEBAB',
      PASCAL: 'PASCAL',
      SNAKE: 'SNAKE',
      UPPER: 'UPPER'
    };
    const length = words || chance.natural({ min: 3, max: 5 });
    const wordsArray = chance.n(chance.word, length);

    if (!separator) {
      separator = {
        [FORMAT.CAMEL]: '',
        [FORMAT.CONSTANT]: '_',
        [FORMAT.DOT]: '.',
        [FORMAT.KEBAB]: '-',
        [FORMAT.PASCAL]: '',
        [FORMAT.SNAKE]: '_',
        [FORMAT.UPPER]: ' '
      }[format];
    }

    const formatter = {
      [FORMAT.CAMEL]: Helpers.capitalize,
      [FORMAT.CONSTANT]: Helpers.toLower,
      [FORMAT.DOT]: Helpers.toLower,
      [FORMAT.KEBAB]: Helpers.toLower,
      [FORMAT.PASCAL]: Helpers.capitalize,
      [FORMAT.SNAKE]: Helpers.toLower,
      [FORMAT.UPPER]: Helpers.toUpper,
    }[format];

    const result = wordsArray.map(formatter).join(separator);

    switch (format) {
      case FORMAT.CAMEL: {
        return result.replace(/^\w/, s => s.toLowerCase());
      }

      case FORMAT.CONSTANT:
      case FORMAT.DOT:
      case FORMAT.KEBAB:
      case FORMAT.PASCAL:
      case FORMAT.SNAKE:
      case FORMAT.UPPER:
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
