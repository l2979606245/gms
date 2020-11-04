/**
  * 
  * @param prices int整型一维数组 
  * @return int整型
  */
 function maxProfit( prices ) {
    // write code here
    // 价格低时买入，价格高于买入时卖出
    // 注意买入时， 要判断连续几天价格最低
    // 卖出时也要考虑， 连续几天价格最高
    let res = 0
    if (prices.length <= 1) return 0
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            res += prices[i] - prices[i - 1]
        }
    }
    return res
}
module.exports = {
    maxProfit : maxProfit
};