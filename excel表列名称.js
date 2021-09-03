
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
  let ans = [];
  while(columnNumber > 0) {
    const a = (columnNumber) % 26;
    ans.push(String.fromCharCode(a - 1 + 'A'.charCodeAt()));
    columnNumber = Math.floor((columnNumber - a) / 26);
  }
  return ans.reverse().join('')
};

console.log(convertToTitle(3));