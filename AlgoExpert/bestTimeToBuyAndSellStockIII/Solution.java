package bestTimeToBuyAndSellStockIII;
//You are given an array prices where prices[i] is the price of a given stock on the ith day.

// Find the maximum profit you can achieve. You may complete at most two transactions.

// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
// example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
public class Solution {
    public int maxProfit(int[] prices) {
      // 1, intial the cost
      int firstTransactionCost = Integer.MAX_VALUE;
      int secondTransactionCost = Integer.MAX_VALUE;

      // 2, intial the profit
      int firstTransactionProfit = 0;
      int secondTransactionProfit = 0;

      // 3, loop through the prices
      for (int price : prices) {
        // 4, If only one transaction is allowed, then the problem is equivalent to find the maximum subarray sum of prices.
        // but low sell hign
        firstTransactionCost = Math.min(firstTransactionCost, price);
        firstTransactionProfit = Math.max(firstTransactionProfit, price - firstTransactionCost);

        // 5, If two transactions are allowed, then the problem is equivalent to find the maximum subarray sum of prices[0:i] + prices[i:n-1] for all i.第二次最少花费的价格挣到的钱，会不会抵消一部分第一次挣到的钱
        secondTransactionCost = Math.min(secondTransactionCost, price - firstTransactionProfit);
        secondTransactionProfit = Math.max(secondTransactionProfit, price - secondTransactionCost);
      }
      return secondTransactionProfit;
      // Time complexity: O(n)
      // Space complexity: O(1)
    }
}
