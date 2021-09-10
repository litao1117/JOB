/**
 * 最长公共子串
 */

function maxLenStr(str1, str2) {
  let dp = new Array(str1.length);
  let max = 0;
  let index = 0;
  for(let i = 0; i < str1.length; i++) {
    dp[i] = new Array();
    for(let j = 0; j < str2.length; j++) {
      if(str1[i] === str2[j]) {
        if(i>0&&j>0&&dp[i-1][j-1]>0) {
          dp[i][j] = dp[i-1][j-1] + 1;
        } else {
          dp[i][j] = 1;
        }
        if(max < dp[i][j]) {
          max = dp[i][j];
          index = i;
        }

      } else {
        dp[i][j] = 0;
      }
    }
  }
  return str1.substr(index-max+1, max);
}

console.log(maxLenStr('acewfg', 'acefgw'));