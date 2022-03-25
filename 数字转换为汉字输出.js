/**
 * 输入数字，转换为汉字输出
 * 例：1000 -> 一千
 * 1201452  -> 一百二十万一千四百五十二
 */

function toChineseNum(num) {
    let strNum = String(num);
    const unit = ['十', '百', '千','万', '十', '百', '千', '亿', '十', '百', '千'];
    const result = ['@'];
    let unitNo = 0;
    for(let i = strNum.length-1; ; i--) {
        result.unshift(numToChinese(strNum[i]));  
        if(i <= 0) break;    
        result.unshift(unit[unitNo]);
        unitNo++;
    }
    return result.join('').replace(/(零[千百十])/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '');
    function numToChinese(n) {
        const chinese = '零一二三四五六七八九';
        return chinese[n];
    }
}
console.log(toChineseNum(12345));   
// console.log('1亿0千1百1十零万1千1百1十1'.replace(/零([万亿])/g, '$1'));         