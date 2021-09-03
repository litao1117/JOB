/**
 *  我手中有一堆扑克牌， 但是观众不知道它的顺序。
    第一步， 我从牌顶拿出一张牌， 放到桌子上。
    第二步， 我从牌顶再拿一张牌， 放在手上牌的底部。
    第三步， 重复第一步、第二步的操作， 直到我手中所有的牌都放到了桌子上。
    最后， 观众可以看到桌子上牌的顺序是：(牌底部）1,2,3,4,5,6,7,8,9,10,11,12,13(牌顶部）
    请问， 我刚开始拿在手里的牌的顺序是什么？
    请编程实现。

    Input 拿出牌的顺序 1,2,3,4,5,6,7,8,9,10,11,12,13
    Output 牌堆原来的顺序
    使用逆向思维：1.从手上牌底部拿出牌放到牌顶 2.从桌子顶部拿一张牌放到手上牌顶
*/

/**
 * 
 * @param {Array} input 
 * @param {Array} cards 
 */
function getCardsOrder(input, cards) {
    // 从手上牌底拿一张放到牌顶，需要判断手上有没有牌
    if(cards.length) {
        let popCard = cards.pop();
        cards.unshift(popCard);
    }
    // 从桌子顶部拿一张牌放到手上牌顶
    let popInput = input.pop();
    cards.unshift(popInput);
    // 如果桌子上面没有牌则返回原手中牌堆
    if(input.length === 0) {
        return cards;
    } else {
        // 否则继续递归取牌
        return getCardsOrder(input, cards);
    }
}

let input = [1,2,3,4,5,6,7,8,9,10,11,12,13];
let test = [1,3,5,4,2];
console.log(getCardsOrder(test, []));