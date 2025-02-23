function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * generate string with format (X,XXX,XXX.XX) with provided number x
 *
 * @param {number} x - number to convert to string
 * @returns {string} output - formatted string (X,XXX,XXX.XX)
 */
function formatAmount(x: number) {
  const numberWithDP = x.toFixed(2);
  return numberWithDP
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

function isString(string: unknown): string is string {
  return (
    typeof string === 'string' ||
    (!!string && string.constructor && string.constructor.name === 'String')
  );
}

export { escapeRegExp, replaceAll, formatAmount, isString };
